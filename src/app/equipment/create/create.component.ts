import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchFacility } from 'src/app/branch-facility/interfaces/Branch-facility.interface';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { EquipmentService } from '../service/equipment.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {

  constructor(private equipmentService: EquipmentService, private _formBuilder: FormBuilder) { }


  clients: Client[];
  typeEquipment: any[];
  equipmentState: any[];
  systemState: any[];
  points: any[];
  countries: Country[];
  state: any[];
  branchFacility: BranchFacility[];
  form: FormGroup;

  async ngOnInit() {
    await this.getTypeEquipment();
    await this.getEquipmentState();
    await this.getSystemState();
    await this.getCountries();
    await this.getState();

    this.form = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      equipo_tipo: [null, [Validators.required]],
      equipo_estado: [null, [Validators.required]],
      equipo_estado_inventario: [null, [Validators.required]],
      equipo_estado_sisitema: [null, [Validators.required]],
      equipo_placa: [null, [Validators.required]],
      MAC: [null, [Validators.required]],
      version_software: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      sucursal: [null, [Validators.required]],
      punto: [null, [Validators.required]],
    });

    this.form.get('pais').valueChanges.subscribe(p => {
      this.clients = [];
      if (p) {
        this.getClientsByCountry(p);
      }
    });

    this.form.get('cliente').valueChanges.subscribe(c => {
      this.branchFacility = [];
      if (c) {
        this.getBranchFacilityByClient(c);
        this.getPointByBranchFacility(c);
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
      let formData = this.form.getRawValue();
      let request = {
        nombre: formData.nombre,
        equipo_placa: formData.equipo_placa,
        MAC: formData.MAC,
        version_software: formData.version_software,
        equipo_tipo: formData.equipo_tipo,
        equipo_estado_inventario: formData.equipo_estado_inventario,
        equipo_estado: formData.equipo_estado,
        equipo_estado_sistema: formData.equipo_estado_sisitema,
        puntos: formData.punto
      };


      this.equipmentService.storeEquipments(request).subscribe(resp => {
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



  getTypeEquipment() {
    this.equipmentService.getTypeEquipment().subscribe(resp => {      
      if (resp.status) {
        this.typeEquipment = [];
      } else {
        this.typeEquipment = resp;
      }
    })
  }

  getEquipmentState() {
    this.equipmentService.getEquipmentState().subscribe(resp => {      
      if (resp.status) {
        this.equipmentState = [];
      } else {
        this.equipmentState = resp;
      }
    })
  }

  getSystemState() {
    this.equipmentService.getSystemState().subscribe(resp => {      
      if (resp.status) {
        this.systemState = [];
      } else {
        this.systemState = resp;
      }
    })
  }

  getState() {
    this.equipmentService.getState().subscribe(resp => {      
      if (resp.status) {
        this.state = [];
      } else {
        this.state = resp;
      }
    })
  }

  getCountries() {
    this.equipmentService.getCountries().subscribe(resp => {      
      if (resp.status) {
        this.countries = [];
      } else {
        this.countries = resp;
      }
    })
  }

  getClientsByCountry(idCountry) {
    this.equipmentService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;      
    })
  }

  getBranchFacilityByClient(idClient) {
    this.equipmentService.getBranchFacilityByClient(idClient).subscribe(resp => {
      if (resp.status) {
        this.branchFacility = [];
      } else {
        this.branchFacility = resp;
      }
    })
  }

  getPointByBranchFacility(idClient) {
    this.equipmentService.getPointByBranchFacility(idClient).subscribe(resp => {
      if (resp.status) {
        this.points = [];
      } else {
        this.points = resp;
      }
    })
  }

}
