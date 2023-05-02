import { Component, OnInit } from '@angular/core';
import { PointsGroupsService } from '../service/points-groups.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Country } from '../../clients/interfaces/Country.interface';
import { Client } from '../../clients/interfaces/Client.interface';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  countries: Country[];
  form: FormGroup;
  clients: Client[];
  points: any[];
  pointsTemp: any[] = [];
  pointsSelects: any[] = [];


  constructor(private pointsGroupsService: PointsGroupsService, private _formBuilder: FormBuilder) { }

  async ngOnInit() {
    await this.getCountries();

    this.form = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      pais: [null, [Validators.required]],
    });

    this.form.get('pais').valueChanges.subscribe(p => {
      this.clients = [];
      if (p) {
        this.getClientsByCountry(p);
      }
    });

    this.form.get('cliente').valueChanges.subscribe(p => {
      this.points = [];
      if (p) {
        this.getPointsContractByClient(p);
      }
    });
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
        puntos: null
      };
      this.pointsSelects.forEach(p => {
        arrPointsSend.push(p.id);
      });
      request.nombre = data.nombre;
      request.clientes = data.cliente;
      request.puntos = arrPointsSend;
      this.pointsGroupsService.storePointsGroups(request).subscribe(resp => {

        if (resp.status == 201) {
          swal.fire({
            title: 'Confirmación.',
            text: 'El registro se ha creado de manera correcta!',
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
            icon: 'success'
          });
          this.clearForm();
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

  getCountries() {
    this.pointsGroupsService.getCountries().subscribe(resp => {
      this.countries = resp;
    })
  }

  getClientsByCountry(idCountry) {
    this.pointsGroupsService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;
    })
  }

  getPointsContractByClient(idClient) {
    this.pointsGroupsService.getPointsContractByClient(idClient).subscribe(resp => {
      this.points = resp;
      console.log(resp);
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
      console.log('desde el 1', this.pointsTemp);

    } else {
      if (this.pointsTemp.length < this.pointsSelects.length) {
        this.pointsTemp = [...this.pointsSelects];
      } else {
        this.pointsTemp = [];
      }
      console.log('desde el 2', this.pointsTemp);
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
    console.log('entrando', this.pointsTemp);

    const flag = this.pointsTemp.find(cSelect => { return cSelect.id == point.id });
    if (!flag) {
      this.pointsTemp.push(point);
    } else {
      const index = this.pointsTemp.indexOf(flag);
      this.pointsTemp.splice(index, 1)
    }
    console.log('saliendo', this.pointsTemp);

  }
}
