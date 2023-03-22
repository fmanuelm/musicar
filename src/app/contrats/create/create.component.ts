import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchFacility } from 'src/app/branch-facility/interfaces/Branch-facility.interface';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { Country } from 'src/app/clients/interfaces/Country.interface';

import swal from 'sweetalert2';
import { ContratsService } from '../service/contrats.service';
declare var $: any;


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  countries: Country[] = [];
  clients: Client[] = [];
  branchFacilities: BranchFacility[] = [];
  subline: any[] = [];
  stateContract: any[] = [];


  form: FormGroup;

  constructor(private contratService: ContratsService, private _formBuilder: FormBuilder) { }

  async ngOnInit() {
    // await this.getCountries();

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




  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {

      // this.branchFacilityService.storeBranchFacility(this.branchSend).subscribe(resp => {

      //   if (resp.status == 201) {
      //     swal.fire({
      //       title: 'Confirmación.',
      //       text: 'El registro se ha creado de manera correcta!',
      //       buttonsStyling: false,
      //       customClass: {
      //         confirmButton: "btn btn-success",
      //       },
      //       icon: 'success'
      //     });
      //     this.clearForm();
      //   } else {
      //     swal.fire({
      //       title: 'Error.',
      //       text: resp.message,
      //       buttonsStyling: false,
      //       customClass: {
      //         confirmButton: "btn btn-success",
      //       },
      //       icon: 'error'
      //     });
      //   }

      // });

    }
  }

  clearForm() {
    this.form.reset();
  }

  // getCountries() {
  //   this.branchFacilityService.getCountries().subscribe(resp => {
  //     this.countries = resp;
  //   })
  // }

 





}
