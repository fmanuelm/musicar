import { Component, OnInit } from '@angular/core';
import { PointsGroupsService } from '../service/points-groups.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Country } from '../../clients/interfaces/Country.interface';
import { Client } from '../../clients/interfaces/Client.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  countries: Country[];
  form: FormGroup;
  clients: Client[];
  points: any[];

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
  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      // let sendRequest: any = this.form.getRawValue();
      // this.branchSend.alias = sendRequest.alias;
      // this.branchSend.nombre = sendRequest.nombre;
      // this.branchSend.clientes = sendRequest.cliente;
      // this.branchSend.observaciones = sendRequest.observaciones;
      // this.branchSend.regionales_ciudades = sendRequest.regionales_ciudades;
      // this.branchSend.centro_operacion_atiende = sendRequest.centro_operacion_atiende;
      // this.branchSend.centro_operacion_vende = sendRequest.centro_operacion_vende;

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
      console.log('jeje',resp);

    })
  }

}
