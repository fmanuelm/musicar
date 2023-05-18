import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { PointsGroupsService } from '../service/points-groups.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  countries: Country[];
  form: FormGroup;
  clients: Client[];
  points: any[];
  pointsTemp: any[] = [];
  pointsSelects: any[] = [];
  idPointGroup: any;
  pointsGroups: any;
  pointsOlds: any[];
  pointsAsociatives: any[];



  constructor(private pointsGroupsService: PointsGroupsService, private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.idPointGroup = this.route.snapshot.paramMap.get('id');
    this.getPointGroupById(this.idPointGroup);
    await this.getCountries();

    this.form = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      pais: [null, [Validators.required]],
    });

    this.form.get('pais').valueChanges.subscribe(p => {
      this.clients = [];
      if (p) {
        this.getClientsByCountry(p.id);
      }
    });

    this.form.get('cliente').valueChanges.subscribe(p => {
      if (p.id != this.pointsGroups.clientes.id) {
        this.points = [];
        this.pointsSelects = [];

      }
      if (p) {

        this.getPointsContractByClient(p.id);
      }
    });
  }

  getPointGroupById(id) {
    this.pointsGroupsService.getPointsGroupsById(id).subscribe(resp => {
      this.pointsGroups = resp;
      this.points = resp.puntos_asociados;
      this.pointsAsociatives = [...resp.puntos_asociados];
      this.pointsSelects = this.points.map(p => ({
        id: p.puntos.id,
        sucursal: p.puntos.contratos[0].contrato.sucursal_instalacion.nombre,
        sublinea: p.puntos.contratos[0].contrato.negocio_sublineas.codigo_sublineas,
        contrato: p.puntos.contratos[0].contrato.codigo_contrato,
      }));
      this.pointsOlds = [...this.pointsSelects];
      this.form.get('nombre').setValue(this.pointsGroups.nombre);
      this.form.get('pais').setValue(this.countries.find(tc => tc.id == this.pointsGroups.clientes.paises.id));
    })
  }

  clearForm() {
    this.form.reset();
    this.pointsSelects = [];
    this.pointsTemp = [];
  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      let data: any = this.form.getRawValue();
      let arrPointsSend: any[] = [];
      let request = {
        nombre: null,
        clientes: null,
        // puntos: null,
        id: this.idPointGroup
      };
      this.pointsSelects.forEach(p => {
        arrPointsSend.push(p.id);
      });
      request.nombre = data.nombre;
      request.clientes = data.cliente.id;
      // request.puntos = arrPointsSend;

      this.diffBetweenPoints(arrPointsSend);
      this.pointsGroupsService.updatePointsGroups(request).subscribe(resp => {

        if (resp.status == 202) {
          swal.fire({
            title: 'Confirmación.',
            text: 'El registro se ha editado de manera correcta!',
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
            icon: 'success'
          });
          this.router.navigate(
            ['grupos-puntos/list']
          );
        } else {
          swal.fire({
            title: 'Error.',
            text: resp.message,
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
            icon: 'error'
          });
        }

      });

    }
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }

  async saveNewPost(arrNewPoints) {
    await arrNewPoints.forEach(np => {
      let request = {
        puntos: np,
        puntos_grupos: this.idPointGroup,
      };
      this.pointsGroupsService.storeOnePointInGroup(request).subscribe(resp => {
        console.log('guardo:', resp);
      });
    });
  }

  async deleteOldPoint(arrDeletePoint) {
    await arrDeletePoint.forEach(pd => {
      this.pointsGroupsService.deleteOnePointIngroup(pd).subscribe(resp => {
        console.log('borro:', resp);
      });
    });
  }

  async diffBetweenPoints(pointsEdited) {
    let arrNewPoints = [];
    let arrDeletePoints = [];

    await this.pointsOlds.forEach(p => {
      let flag = pointsEdited.find(pE => pE == p.id);
      if (!flag) {
        arrDeletePoints.push(p.id);
      }
    });

    await pointsEdited.forEach(p => {
      let flag = this.pointsOlds.find(pE => pE.id == p);
      if (!flag) {
        arrNewPoints.push(p);
      }
    });

    let arrIdDelete = [];

    if (arrDeletePoints.length > 0) {
      console.log('entra');

      arrDeletePoints.forEach(pd => {
        let pointFind = this.pointsAsociatives.find(p => p.puntos.id == pd);
        // @ts-ignore
        arrIdDelete.push(pointFind.id);
      });
    }

    this.saveNewPost(arrNewPoints);
    this.deleteOldPoint(arrIdDelete);

  }

  getCountries() {
    this.pointsGroupsService.getCountries().subscribe(resp => {
      this.countries = resp;
    })
  }

  getClientsByCountry(idCountry) {
    this.pointsGroupsService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;
      this.form.get('cliente').setValue(this.clients.find(tc => tc.id == this.pointsGroups.clientes.id));

    })
  }

  getPointsContractByClient(idClient) {
    this.pointsGroupsService.getPointsContractByClient(idClient).subscribe(resp => {
      this.points = resp;
      let pointTemps = [];

      this.points.forEach(p => {
        let flag = this.pointsSelects.find(pf => pf.id == p.id);
        if (!flag) {
          pointTemps.push(p);
        }
      });
      this.points = [...pointTemps];
    })
  }

  cancelModal() {
    this.pointsTemp = [];
  }

  aceptModal() {
    this.pointsTemp.forEach(c => {
      this.pointsSelects.push(c)
    });
    this.pointsTemp.forEach(c => {

      const flag = this.points.find(cSelect => { return cSelect.id == c.id });
      if (flag) {
        const index = this.points.indexOf(flag);
        this.points.splice(index, 1)
      }
    });
    this.pointsTemp = [];
  }

  selectCountry(point) {
    const flag = this.pointsTemp.find(cSelect => { return cSelect.id == point.id });
    if (!flag) {
      this.pointsTemp.push(point);
    } else {
      const index = this.pointsTemp.indexOf(flag);
      this.pointsTemp.splice(index, 1)
    }
  }


  deleteCountry() {
    this.pointsTemp.forEach(c => { this.countries.push(c); });
    this.pointsTemp.forEach(c => {
      const flag = this.pointsSelects.find(cSelect => { return cSelect.id == c.id });
      if (flag) {
        const index = this.pointsSelects.indexOf(flag);
        this.pointsSelects.splice(index, 1)
      }
    });
    this.pointsTemp = [];
  }

  selectAll(flag) {
    if (flag == 1) {
      if (this.pointsTemp.length < this.points.length) {
        this.pointsTemp = [...this.points];
      } else {
        this.pointsTemp = [];
      }

    } else {
      if (this.pointsTemp.length < this.pointsSelects.length) {
        this.pointsTemp = [...this.pointsSelects];
      } else {
        this.pointsTemp = [];
      }
    }
  }

  deletePoint() {
    this.pointsTemp.forEach(c => { this.points.push(c); });
    this.pointsTemp.forEach(c => {
      const flag = this.pointsSelects.find(cSelect => { return cSelect.id == c.id });
      if (flag) {
        const index = this.pointsSelects.indexOf(flag);
        this.pointsSelects.splice(index, 1)
      }
    });
    this.pointsTemp = [];
  }

  checkedSelectPoint(point) {
    const flag = this.pointsTemp.find(cSelect => { return cSelect.id == point.id });
    if (!flag) {
      this.pointsTemp.push(point);
    } else {
      const index = this.pointsTemp.indexOf(flag);
      this.pointsTemp.splice(index, 1)
    }
  }
}
