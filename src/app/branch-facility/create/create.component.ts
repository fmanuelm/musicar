import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { BranchFacility, Center, City, Regional } from '../interfaces/Branch-facility.interface';
import { BranchFacilityService } from '../service/branch-facility.service';
import swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {

  countries: Country[] = [];
  clients: Client[] = [];
  regionals: Regional[] = [];
  cities: City[] = [];
  centerSells: Center[] = [];
  centerAttendants: Center[] = [];
  branchSend: BranchFacility = {
    nombre: '',
    alias: '',
    observaciones: '',
    clientes: 0,
    regionales_ciudades: 0,
    centro_operacion_vende: 0,
    centro_operacion_atiende: 0
  };
  form: FormGroup;

  constructor(private branchFacilityService: BranchFacilityService, private _formBuilder: FormBuilder) { }

  async ngOnInit() {
    await this.getCountries();

    // await this.getClients();

    this.form = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      alias: [null, [Validators.required]],
      observaciones: [null],
      cliente: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      regional: [null, [Validators.required]],
      regionales_ciudades: [null, [Validators.required]],
      centro_operacion_vende: [null, [Validators.required]],
      centro_operacion_atiende: [null, [Validators.required]],
    });

    this.form.get('pais').valueChanges.subscribe(p => {
      this.clients = [];
      this.regionals = [];
      this.centerSells = [];
      this.centerAttendants = [];
      if (p) {
        this.getClientsByCountry(p);
        this.getRegionalsByCountry(p);
        this.getCenterSells(p);
        this.getCenterAttendants(p);
      }
    });

    this.form.get('regional').valueChanges.subscribe(p => {
      this.cities = [];
      this.getCityByRegional(p);
    });
  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      let sendRequest: any = this.form.getRawValue();
      this.branchSend.alias = sendRequest.alias;
      this.branchSend.nombre = sendRequest.nombre;
      this.branchSend.clientes = sendRequest.cliente;
      this.branchSend.observaciones = sendRequest.observaciones;
      this.branchSend.regionales_ciudades = sendRequest.regionales_ciudades;
      this.branchSend.centro_operacion_atiende = sendRequest.centro_operacion_atiende;
      this.branchSend.centro_operacion_vende = sendRequest.centro_operacion_vende;

      this.branchFacilityService.storeBranchFacility(this.branchSend).subscribe(resp => {

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
    this.branchFacilityService.getCountries().subscribe(resp => {
      this.countries = resp;
    })
  }

  getCenterSells(idCountry) {
    this.branchFacilityService.getCenterSells(idCountry).subscribe(resp => {
      this.centerSells = resp;
    })
  }

  getCenterAttendants(idCountry) {
    this.branchFacilityService.getCenterAttendants(idCountry).subscribe(resp => {
      this.centerAttendants = resp;
    })
  }

  getClientsByCountry(idCountry) {
    this.branchFacilityService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;
    })
  }

  getCityByRegional(idRegional) {
    this.branchFacilityService.getCityByRegional(idRegional).subscribe(resp => {      
      if (resp.status) {
        this.cities = [];
      } else {
        this.cities = resp;

      }
    })
  }

  getRegionalsByCountry(idCountry) {
    this.branchFacilityService.getRegionalsByCountry(idCountry).subscribe(resp => {
      
      if (resp.status) {
        this.regionals = [];
      } else {
        this.regionals = resp;
      }
    })
  }

}
