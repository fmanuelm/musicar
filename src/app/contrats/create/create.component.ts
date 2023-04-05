import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchFacility } from 'src/app/branch-facility/interfaces/Branch-facility.interface';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { ContratsService } from '../service/contrats.service';

import swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  countries: Country[] = [];
  clients: Client[] = [];
  branchFacilities: BranchFacility[] = [];
  sublines: any[] = [];
  contractStatus: any[] = [];
  form: FormGroup;

  constructor(private contratService: ContratsService, private _formBuilder: FormBuilder) { }

  async ngOnInit() {
    await this.getCountries();
    await this.getSublines();
    await this.getContractStatus();


    this.form = this._formBuilder.group({
      pais: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      sucursal: [null, [Validators.required]],
      sublinea: [null, [Validators.required]],
      numero_contrato: [null, [Validators.required]],
      estado_contrato: [null, [Validators.required]],
      fecha_inicio: [null, [Validators.required]],
      fecha_fin: [null, [Validators.required]],
      m_administrados: [null],
      m_creacion: [null],
    });


    this.form.get('pais').valueChanges.subscribe(p => {
      this.clients = [];
      if(p){
        this.getClientsByCountry(p);
      }
    });

    this.form.get('cliente').valueChanges.subscribe(p => {
      this.branchFacilities = [];
      if(p){
        this.getBranchFacilityByClient(p);
      }
    });

  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {

      let requestSend = this.form.getRawValue();
      console.log(requestSend);

      let resquest = {
        codigo_contrato: requestSend.numero_contrato,
        fecha_inicio_contrato: requestSend.fecha_inicio,
        fecha_fin_contrato: requestSend.fecha_fin,
        mensajes_contador_administracion: requestSend.m_administrados,
        mensajes_contador_creacion: requestSend.m_creacion,
        contratos_estado: requestSend.estado_contrato,
        negocio_sublineas: requestSend.sublinea,
        sucursal_instalacion: requestSend.sucursal
      }

      this.contratService.storeContrat(resquest).subscribe(resp => {
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

  clearForm() {
    this.form.reset();
  }

  getCountries() {
    this.contratService.getCountries().subscribe(resp => {
      this.countries = resp;
    })
  }

  getBranchFacilityByClient(idClient) {
    this.contratService.getBranchFacilityByClient(idClient).subscribe(resp => {
      this.branchFacilities = [];
      if (resp.status) {
        this.branchFacilities = [];
      } else {
        this.branchFacilities = resp;
      }
    })
  }

  getSublines() {
    this.contratService.getSublines().subscribe(resp => {      
      this.sublines = [];
      if (resp.status) {
        this.sublines = [];
      } else {
        this.sublines = resp;
      }
    })
  }

  getContractStatus() {
    this.contratService.getContractStatus().subscribe(resp => {      
      this.contractStatus = [];
      if (resp.status) {
        this.contractStatus = [];
      } else {
        this.contractStatus = resp;
      }
    })
  }

  getClientsByCountry(idCountry) {
    this.contratService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;
    })
  }





}
