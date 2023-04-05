import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchFacility } from 'src/app/branch-facility/interfaces/Branch-facility.interface';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { PointService } from '../service/point.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {

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

  constructor(private pointService: PointService, private _formBuilder: FormBuilder) { }

  async ngOnInit() {
    await this.getCountries();
    // await this.getBranchFacilities();


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
        this.getClientsByCountry(p);
      }
    });

    this.form.get('cliente').valueChanges.subscribe(p => {
      this.branchFacilities = [];
      if (p) {
        this.getBranchFacilityByClient(p);
      }
    });

    this.form.get('sucursal').valueChanges.subscribe(p => {
      this.allContracts = [];
      if (p) {
        this.getContrats(p);
      }
    });
  }


  clearForm() {
    this.form.reset();
    this.contractTempAdd = [];
    this.contractTempDelete = [];
    this.contractsSelecteds = [];
    // this.getContrats();
  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {

      let requestSend = this.form.getRawValue();      
      let arrContractSend = [];

      this.contractsSelecteds.forEach(c => {
        let objTemp = {
          id_sublinea_negocio: c.negocio_sublineas.id,
          sublinea: c.sublinea,
          id_contrato: c.id,
          id_cliente: c.sucursal_instalacion.clientes.id
        }
        arrContractSend.push(objTemp);
      });
      
            
      let resquest = {
        fecha_inicio_contador: requestSend.fecha_inicio_contador,
        fecha_fin_contador: requestSend.fecha_fin_contador,

        contratos: arrContractSend,
      }

      this.pointService.storePoint(resquest).subscribe(resp => {
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
    this.pointService.getCountries().subscribe(resp => {
      this.countries = resp;
    })
  }

  getContrats(idBranchFacility) {
    this.pointService.getContrats(idBranchFacility).subscribe(resp => {
      this.allContracts = resp;
    })
  }

  getBranchFacilityByClient(idClient) {
    this.pointService.getBranchFacilityByClient(idClient).subscribe(resp => {
      if (resp.status) {
        this.branchFacilities = [];
      } else {
        this.branchFacilities = resp;
      }
    })
  }

  getClientsByCountry(idCountry) {
    this.pointService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;
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

}
