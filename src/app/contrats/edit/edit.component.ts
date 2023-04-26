import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchFacility } from 'src/app/branch-facility/interfaces/Branch-facility.interface';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { ContratsService } from '../service/contrats.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  constructor(private contratService: ContratsService, private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }


  countries: Country[] = [];
  clients: Client[] = [];
  branchFacilities: BranchFacility[] = [];
  sublines: any[] = [];
  contractStatus: any[] = [];
  form: FormGroup;
  idContarct: any;
  contract: any;

  async ngOnInit() {
    this.idContarct = this.route.snapshot.paramMap.get('id');
    await this.getCountries();
    await this.getSublines();
    await this.getContractStatus();
    await this.getContratById(this.idContarct);


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
      this.getClientsByCountry(p.id);
    });

    this.form.get('cliente').valueChanges.subscribe(p => {
      this.branchFacilities = [];
      this.getBranchFacilityByClient(p.id);
    });
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }

  getBranchFacilityByClient(idClient) {
    this.contratService.getBranchFacilityByClient(idClient).subscribe(resp => {
      this.branchFacilities = resp;
    })
  }

  getContratById(id) {
    this.contratService.getContratById(id).subscribe(resp => {
      this.contract = resp;
      
      this.form.get('pais').setValue(this.countries.find(c => c.id == this.contract.sucursal_instalacion.regionales_ciudades.regionales.paises.id));
      this.form.get('sucursal').setValue(this.branchFacilities.find(c => c.id == this.contract.sucursal_instalacion.id));
      this.form.get('sublinea').setValue(this.sublines.find(c => c.id == this.contract.negocio_sublineas.id));
      this.form.get('estado_contrato').setValue(this.contractStatus.find(c => c.id == this.contract.contratos_estado.id));
      this.form.get('numero_contrato').setValue(this.contract.codigo_contrato);
      this.form.get('fecha_inicio').setValue(this.contract.fecha_inicio_contrato);
      this.form.get('fecha_fin').setValue(this.contract.fecha_fin_contrato);
      this.form.get('m_administrados').setValue(this.contract.mensajes_contador_administracion);
      this.form.get('m_creacion').setValue(this.contract.mensajes_contador_creacion);

    })
  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {

      let requestSend = this.form.getRawValue();
      
      let resquest = {
        codigo_contrato: requestSend.numero_contrato,
        fecha_inicio_contrato: requestSend.fecha_inicio,
        fecha_fin_contrato: requestSend.fecha_fin,
        mensajes_contador_administracion: requestSend.m_administrados,
        mensajes_contador_creacion: requestSend.m_creacion,
        contratos_estado: requestSend.estado_contrato.id,
        negocio_sublineas: requestSend.sublinea.id,
        sucursal_instalacion: requestSend.sucursal.id
      }

      this.contratService.updateContract(resquest).subscribe(resp => {
        if (resp.status == 202) {
          swal.fire({
            title: 'Confirmación.',
            text: 'El registro se ha creado de manera correcta!',
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
            icon: 'success'
          });
          this.router.navigate(
            ['contratos/list']
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

  getCountries() {
    return this.contratService.getCountries().subscribe(resp => {
      this.countries = resp;
    })
  }


  getSublines() {
    return this.contratService.getSublines().subscribe(resp => {
      this.sublines = resp;

    })
  }

  getContractStatus() {
    return this.contratService.getContractStatus().subscribe(resp => {
      this.contractStatus = resp;
    })
  }

  getClientsByCountry(idCountry) {
    return this.contratService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;
      this.form.get('cliente').setValue(this.clients.find(c => c.id == this.contract.sucursal_instalacion.clientes.id));

      // this.form.get('cliente').setValue(this.branchFacility.nombre);

    })
  }

}
