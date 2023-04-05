import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EquipmentService } from '../service/equipment.service';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { BranchFacility } from 'src/app/branch-facility/interfaces/Branch-facility.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  clients: Client[];
  typeEquipment: any[];
  equipmentState: any[];
  systemState: any[];
  points: any[];
  countries: Country[];
  branchFacility: BranchFacility[];
  form: FormGroup;
  state: any[];
  constructor(private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private _formBuilder: FormBuilder,
    private router: Router) { }
  equipment: any;
  idEquipment: any;

  async ngOnInit() {
    await this.getTypeEquipment();
    await this.getEquipmentState();
    await this.getSystemState();
    await this.getCountries();
    await this.getState();
    this.idEquipment = this.route.snapshot.paramMap.get('id');
    this.getEquipmentById(this.idEquipment);

    this.form = this._formBuilder.group({

      nombre: [null, [Validators.required]],
      equipo_tipo: [null, [Validators.required]],
      equipo_estado_inventario: [null, [Validators.required]],
      equipo_estado_sisitema: [null, [Validators.required]],
      equipo_estado: [null, [Validators.required]],
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
        this.getClientsByCountry(p.id);
      }
    });

    this.form.get('cliente').valueChanges.subscribe(c => {
      this.branchFacility = [];
      console.log('el cliente:', c.id);
      console.log('el cliente:', c.razon_social);

      if (c) {
        this.getBranchFacilityByClient(c.id);
        this.getPointByBranchFacility(c.id);
      }
    });
  }


  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      let formData = this.form.getRawValue();
      let request = {
        id: parseInt(this.idEquipment),
        nombre: formData.nombre,
        equipo_placa: formData.equipo_placa,
        MAC: formData.MAC,
        version_software: formData.version_software,
        equipo_tipo: formData.equipo_tipo.id,
        equipo_estado_inventario: formData.equipo_estado_inventario.id,
        equipo_estado: formData.equipo_estado.id,
        equipo_estado_sistema: formData.equipo_estado_sisitema.id,
        puntos: formData.punto.id
      };
  
      this.equipmentService.updateEquipments(request).subscribe(resp => {
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
            ['equipos/list']
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


  getEquipmentById(id) {
    this.equipmentService.getEquipmentById(id).subscribe(resp => {
      this.equipment = resp;
      // this.typeEquipment.find(c => c.id == this.equipment.equipo_tipo.id)
      this.form.get('nombre').setValue(this.equipment.nombre);
      this.form.get('equipo_tipo').setValue(this.typeEquipment.find(c => c.id == this.equipment.equipo_tipo.id));
      this.form.get('equipo_estado_inventario').setValue(this.equipmentState.find(c => c.id == this.equipment.equipo_estado_inventario.id));
      this.form.get('equipo_estado_sisitema').setValue(this.systemState.find(c => c.id == this.equipment.equipo_estado_sistema.id));
      this.form.get('equipo_placa').setValue(this.equipment.equipo_placa);
      this.form.get('MAC').setValue(this.equipment.MAC);
      this.form.get('version_software').setValue(this.equipment.version_software);
      this.form.get('pais').setValue(this.countries.find(c => c.id == this.equipment.puntos.contratos[0].cliente.paises.id));
      this.form.get('equipo_estado').setValue(this.state.find(c => c.id == this.equipment.equipo_estado.id));      

    })
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
      this.form.get('cliente').setValue(this.clients.find(c => c.id == this.equipment.puntos.contratos[0].cliente.id));
    })
  }

  getBranchFacilityByClient(idClient) {
    this.equipmentService.getBranchFacilityByClient(idClient).subscribe(resp => {
      if (resp.status) {
        this.branchFacility = [];
      } else {
        this.branchFacility = resp;
        this.form.get('sucursal').setValue(this.branchFacility.find(c => c.id == this.equipment.puntos.contratos[0].contrato.sucursal_instalacion.id));
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

  getPointByBranchFacility(idClient) {
    this.equipmentService.getPointByBranchFacility(idClient).subscribe(resp => {
      console.log('puntossss', resp);
      if (resp.status) {
        this.points = [];
      } else {
        this.points = resp;       
        this.form.get('punto').setValue(this.points.find(c => c.id == this.equipment.puntos.id));
      }
    })
  }

}
