import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BranchFacilityService } from '../service/branch-facility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { BranchFacility, Center, City, Regional } from '../interfaces/Branch-facility.interface';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private branchFacilityService: BranchFacilityService,
    private _formBuilder: FormBuilder,
    private router: Router) { }

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
  idBranchFacility: any;
  branchFacility: any;
  form: FormGroup;

  async ngOnInit() {
    this.idBranchFacility = this.route.snapshot.paramMap.get('id');
    await this.getCountries();
    await this.getBranchFacilityById(this.idBranchFacility);

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
      this.cities = [];

      if (p) {
        this.getClientsByCountry(p.id);
        this.getRegionalsByCountry(p.id);
        this.getCenterSells(p.id);
        this.getCenterAttendants(p.id);
      }
    });

    this.form.get('regional').valueChanges.subscribe(p => {
      this.cities = [];
      if (p) {
        this.getCityByRegional(p.id);
      }
    });

  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      let sendRequest: any = this.form.getRawValue();
      this.branchSend.id = this.idBranchFacility;
      this.branchSend.alias = sendRequest.alias;
      this.branchSend.nombre = sendRequest.nombre;
      this.branchSend.clientes = sendRequest.cliente.id;
      this.branchSend.observaciones = sendRequest.observaciones;
      this.branchSend.regionales_ciudades = sendRequest.regionales_ciudades.id;
      this.branchSend.centro_operacion_atiende = sendRequest.centro_operacion_atiende.id;
      this.branchSend.centro_operacion_vende = sendRequest.centro_operacion_vende.id;

      this.branchFacilityService.updateBranchFacility(this.branchSend).subscribe(resp => {

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
            ['sucursal-instalacion/list',]
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

  async getBranchFacilityById(id) {
    this.branchFacilityService.getBranchsFacilityById(id).subscribe(resp => {
      this.branchFacility = resp;
      this.form.get('nombre').setValue(this.branchFacility.nombre);
      this.form.get('alias').setValue(this.branchFacility.alias);
      this.form.get('observaciones').setValue(this.branchFacility.observaciones);
      this.form.get('pais').setValue(this.countries.find(c => c.id == this.branchFacility.clientes.paises.id));
    })
  }

  getCountries() {
    this.branchFacilityService.getCountries().subscribe(resp => {
      this.countries = resp;
    })
  }

  getCenterSells(idCountry) {
    this.branchFacilityService.getCenterSells(idCountry).subscribe(resp => {
      if (resp.status) {
        this.centerSells = [];
      } else {
        this.centerSells = resp;
        this.form.get('centro_operacion_vende').setValue(this.centerSells.find(c => c.id == this.branchFacility.centro_operacion_vende.id));
      }
    })
  }

  getCenterAttendants(idCountry) {
    this.branchFacilityService.getCenterAttendants(idCountry).subscribe(resp => {
      if (resp.status) {
        this.centerAttendants = [];
      } else {
        this.centerAttendants = resp;
        this.form.get('centro_operacion_atiende').setValue(this.centerAttendants.find(c => c.id == this.branchFacility.centro_operacion_atiende.id));
      }
    })
  }

  getClientsByCountry(idCountry) {
    this.branchFacilityService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;
      this.form.get('cliente').setValue(this.clients.find(c => c.id == this.branchFacility.clientes.id));
    })
  }

  getCityByRegional(idRegional) {
    this.branchFacilityService.getCityByRegional(idRegional).subscribe(resp => {
      if (resp.status) {
        this.cities = [];
      } else {
        this.cities = resp;        
        this.form.get('regionales_ciudades').setValue(this.cities.find(c => c.id == this.branchFacility.regionales_ciudades.id));
      }
    })
  }

  getRegionalsByCountry(idCountry) {
    this.branchFacilityService.getRegionalsByCountry(idCountry).subscribe(resp => {
      if (resp.status) {
        this.regionals = [];
      } else {
        this.regionals = resp;
        this.form.get('regional').setValue(this.regionals.find(c => c.id == this.branchFacility.regionales_ciudades.regionales.id));
      }
    })
  }

}
