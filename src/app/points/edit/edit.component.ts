import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchFacility } from 'src/app/branch-facility/interfaces/Branch-facility.interface';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { PointService } from '../service/point.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',

})
export class EditComponent implements OnInit {

  form: FormGroup;
  countries: Country[] = [];
  clients: Client[] = [];
  branchFacilities: BranchFacility[] = [];
  contractsSelecteds: any[] = [];
  allContracts: any[] = [];
  public cols = [
    { field: 'codigo_contrato', header: 'Contrato' },
    { field: 'estado', header: 'Estado' },
    { field: 'sublinea', header: 'Sublínea' },
  ];
  contractTempAdd: any[] = [];
  contractTempDelete: any[] = [];
  idPoint: string;
  point: any;
  contratInfo: any;

  constructor(private pointService: PointService, private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder) { }


  async ngOnInit() {
    this.idPoint = this.route.snapshot.paramMap.get('id');
    await this.getCountries();
    // await this.getBranchFacilities();
    await this.getPointById(this.idPoint);

    this.form = this._formBuilder.group({
      pais: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      sucursal: [null, [Validators.required]],
      fecha_inicio_contador: [null],
      fecha_fin_contador: [null],
    });

    this.form.get('pais').valueChanges.subscribe(p => {
      this.clients = [];
      if (p) {
        this.getClientsByCountry(p.id);
      }
    });

    this.form.get('cliente').valueChanges.subscribe(p => {
      // this.branchFacilities = [];
      // this.contractTempAdd = [];
      // this.contractsSelecteds = [];
      // this.allContracts = [];
      // this.contractTempDelete = [];
      if (p.id != this.point.contratos[0].cliente.id) {
        this.contractTempAdd = [];
        this.contractsSelecteds = [];
        this.allContracts = [];
        this.contractTempDelete = [];
        this.contratInfo = {};
      }
      if (p) {
        this.getBranchFacilityByClient(p.id);
      }
    });

    this.form.get('sucursal').valueChanges.subscribe(p => {
      this.allContracts = [];
      if (p.id != this.point.contratos[0].contrato.sucursal_instalacion.id) {
        this.contractTempAdd = [];
        this.contractsSelecteds = [];
        this.allContracts = [];
        this.contractTempDelete = [];
        this.contratInfo = {};
      }
      if (p) {
        this.getContrats(p.id);
      }
    });
  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {

      let requestSend = this.form.getRawValue();
      let arrContractSend = [];

      console.log('contratos seleccionados: ', this.contractsSelecteds);

      this.contractsSelecteds.forEach(c => {
        let objTemp = {
          id_sublinea_negocio: c.negocio_sublineas.id,
          sublinea: c.sublinea,
          id_contrato: c.id,
          id_cliente: c.sucursal_instalacion.clientes.id
        }
        console.log('objeto temporal', objTemp);

        arrContractSend.push(objTemp);
      });


      let resquest = {
        fecha_inicio_contador: requestSend.fecha_inicio_contador,
        fecha_fin_contador: requestSend.fecha_fin_contador,
        contratos: arrContractSend,
      }

      this.pointService.updatePoint(resquest).subscribe(resp => {
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
            ['puntos/list']
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


  getCountries() {
    this.pointService.getCountries().subscribe(resp => {
      this.countries = resp;
    })
  }

  getContrats(idBranchFacility) {
    this.pointService.getContrats(idBranchFacility).subscribe(resp => {
      this.allContracts = resp;
      if (this.contractsSelecteds.length != 0) {
        this.contractsSelecteds.forEach(cS => {
          this.allContracts = this.allContracts.filter(c => { c.id != cS.id });
        });
      }
    })
  }

  getBranchFacilityByClient(idClient) {
    this.pointService.getBranchFacilityByClient(idClient).subscribe(resp => {
      if (resp.status) {
        this.branchFacilities = [];
      } else {
        this.branchFacilities = resp;
        this.form.get('sucursal').setValue(this.branchFacilities.find(c => c.id == this.point.contratos[0].contrato.sucursal_instalacion.id));
      }
    })
  }

  getClientsByCountry(idCountry) {
    this.pointService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;
      this.form.get('cliente').setValue(this.clients.find(c => c.id == this.point.contratos[0].cliente.id));
    })
  }

  selectContact(contract, flagType) {
    if (flagType == 1) {
      const flag = this.contractTempAdd.find(cSelect => { return cSelect.id == contract.id });
      if (!flag) {
        this.contractTempAdd.push(contract);
      } else {
        const index = this.contractTempAdd.indexOf(flag);
        this.contractTempAdd.splice(index, 1)
      }
    } else {
      const flag = this.contractTempDelete.find(cSelect => { return cSelect.id == contract.id });
      if (!flag) {
        this.contractTempDelete.push(contract);
      } else {
        const index = this.contractTempDelete.indexOf(flag);
        this.contractTempDelete.splice(index, 1)
      }
    }
  }

  aceptModal() {
    this.contractTempAdd.forEach(c => {
      this.contractsSelecteds.push(c);
      this.allContracts = this.allContracts.filter(cf => { return cf.id != c.id });
    });
    this.contractTempAdd = [];
  }

  deleteContract() {
    this.contractTempDelete.forEach(c => {
      this.allContracts.push(c);
      this.contractsSelecteds = this.contractsSelecteds.filter(cf => { return cf.id != c.id });
    });
    this.contractTempDelete = [];
  }

  getPointById(idPoint) {
    this.pointService.getPointById(idPoint).subscribe(resp => {
      this.point = resp;
      console.log(resp);
      this.contratInfo = resp.contratos[0].contrato;
      this.form.get('fecha_inicio_contador').setValue(this.point.fecha_inicio_contador);
      this.form.get('fecha_fin_contador').setValue(this.point.fecha_fin_contador);
      this.form.get('pais').setValue(this.countries.find(c => c.id == this.point.contratos[0].cliente.paises.id));
      this.contractsSelecteds = this.point.contratos;
      this.contractsSelecteds = this.contractsSelecteds.map(c => ({
        ...c,
        sublinea: c.sublinea,
        codigo_contrato: c.contrato.codigo_contrato,
        estado: c.contrato.contratos_estado.referencia,
      }));

    })
  }
}
