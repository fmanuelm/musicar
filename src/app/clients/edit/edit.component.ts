import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client, DatosContacto, Pais } from '../interfaces/Client.interface';
import { Country } from '../interfaces/Country.interface';
import { EconomicSector } from '../interfaces/EconomicSector.interface';
import { TypeClient } from '../interfaces/TypeClient.interface';
import { ClientsService } from '../service/clients.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',

})
export class EditComponent implements OnInit {

  public comercialAttend: any;
  public clientGruops: any;
  public clientSend: Client = {
    razon_social: '',
    razon_comercial: '',
    nit: '',
    observaciones: '',
    paises: undefined,
    paises_extra: [],
    subgrupo_economico: 0,
    tipo_cliente: 0,
    usuario_comercial: 0,
    datos_contacto: [],
    horarios: {
      lunes: {
        hora_inicial: null,
        hora_final: null,
      },
      martes: {
        hora_inicial: null,
        hora_final: null,
      },
      miercoles: {
        hora_inicial: null,
        hora_final: null,
      },
      jueves: {
        hora_inicial: null,
        hora_final: null,
      },
      viernes: {
        hora_inicial: null,
        hora_final: null,
      },
      sabado: {
        hora_inicial: null,
        hora_final: null,
      },
      domingo: {
        hora_inicial: null,
        hora_final: null,
      },
      festivos: {
        hora_inicial: null,
        hora_final: null,
      },
    },
    pais_nombre: '',
    paises_extras: []
  };
  public typeClient: TypeClient[];
  public countries: Country[];
  public countriesInput: Country[];
  public countriesSelects: Country[] = [];
  public countriesSelectsTemp: Country[] = [];
  public countriesTemp: Country[] = [];
  public countriesSend: Country[] = [];
  public economicSectors: EconomicSector[] = [];
  public contact: DatosContacto = {
    cliente_tipo_contacto: null,
    correo_contacto: null,
    nombre_contacto: null,
    telefono_contacto: null
  };
  public typeContact: any[] = [];
  public contacts: DatosContacto[] = [];
  public contactsTemp: DatosContacto[] = [];
  public cols = [
    { field: 'nombre', header: 'País' },
  ];
  form: FormGroup;
  formModalContact: FormGroup;
  public lunesMin;
  public lunesMax;
  private idClient: any;
  constructor(private clientService: ClientsService, private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder,) {


  }

  async ngOnInit() {
    this.idClient = this.route.snapshot.paramMap.get('id');
   await  this.getTypeClient();
   await  this.getCountry();
   await  this.getEconomicSector();
   await  this.getComercialAttend();
   await  this.getTypeContact();
   await  this.getClientGroups();
   await  this.getClienteById(this.idClient);

    this.form = this._formBuilder.group({
      razon_social: [this.clientSend.razon_social, [Validators.required]],
      razon_comercial: [null],
      nit: [null, [Validators.required]],
      tipo_cliente: [null, [Validators.required]],
      paises: [null, [Validators.required]],
      subgrupo_economico: [null, [Validators.required]],
      usuario_comercial: [null, [Validators.required]],

      observaciones: [null],

      lunes_hora_inicial: [null],
      lunes_hora_final: [null],

      martes_hora_inicial: [null],
      martes_hora_final: [null],

      miercoles_hora_inicial: [null],
      miercoles_hora_final: [null],

      jueves_hora_inicial: [null],
      jueves_hora_final: [null],

      viernes_hora_inicial: [null],
      viernes_hora_final: [null],

      sabado_hora_inicial: [null],
      sabado_hora_final: [null],

      domingo_hora_inicial: [null],
      domingo_hora_final: [null],

      festivos_hora_inicial: [null],
      festivos_hora_final: [null],

    });

    this.formModalContact = this._formBuilder.group({
      nombre_contacto: [null, [Validators.required]],
      telefono_contacto: [null, [Validators.required]],
      correo_contacto: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      cliente_tipo_contacto: [null, [Validators.required]],
    });
  }

  clearForm() {
    this.form.reset();
    this.countriesSelects = [];
    this.contacts = [];
    this.getCountry();
  }

  getClienteById(id) {
    this.clientService.getClienteById(id).subscribe(resp => {
      this.clientSend = resp;
      let arrAllCountriesSelects = [];
      arrAllCountriesSelects.push(this.clientSend.paises);
      this.clientSend.paises_extras.forEach(c => {
        arrAllCountriesSelects.push(c.paises);
        this.countriesSelects.push(c.paises);
      });

      this.contacts = this.clientSend.datos_contacto;
      const horarios = this.clientSend.horarios_cliente.horarios;
      this.form.get('razon_social').setValue(this.clientSend.razon_social);
      this.form.get('razon_comercial').setValue(this.clientSend.razon_comercial);
      this.form.get('nit').setValue(this.clientSend.nit);
      this.form.get('observaciones').setValue(this.clientSend.observaciones);
      this.form.get('tipo_cliente').setValue(this.typeClient.find(tc => tc.id == this.clientSend.tipo_cliente.id));
      this.form.get('paises').setValue(this.countriesInput.find(tc => tc.id == this.clientSend.paises.id));
      this.form.get('usuario_comercial').setValue(this.comercialAttend.find(tc => tc.id == this.clientSend.usuario_comercial.id));
      this.form.get('subgrupo_economico').setValue(this.economicSectors.find(tc => tc.id == this.clientSend.subgrupo_economico.actividad_economica.id));
      this.form.get('lunes_hora_inicial').setValue(horarios.lunes.hora_inicial);
      this.form.get('lunes_hora_final').setValue(horarios.lunes.hora_final);

      this.form.get('martes_hora_inicial').setValue(horarios.martes.hora_inicial);
      this.form.get('martes_hora_final').setValue(horarios.martes.hora_final);

      this.form.get('miercoles_hora_inicial').setValue(horarios.miercoles.hora_inicial);
      this.form.get('miercoles_hora_final').setValue(horarios.miercoles.hora_final);

      this.form.get('jueves_hora_inicial').setValue(horarios.jueves.hora_inicial);
      this.form.get('jueves_hora_final').setValue(horarios.jueves.hora_final);

      this.form.get('viernes_hora_inicial').setValue(horarios.viernes.hora_inicial);
      this.form.get('viernes_hora_final').setValue(horarios.viernes.hora_final);

      this.form.get('sabado_hora_inicial').setValue(horarios.sabado.hora_inicial);
      this.form.get('sabado_hora_final').setValue(horarios.sabado.hora_final);

      this.form.get('domingo_hora_inicial').setValue(horarios.domingo.hora_inicial);
      this.form.get('domingo_hora_final').setValue(horarios.domingo.hora_final);

      if (horarios.festivos) {
        this.form.get('festivos_hora_inicial').setValue(horarios.festivos.hora_inicial);
        this.form.get('festivos_hora_final').setValue(horarios.festivos.hora_final);
      }

      arrAllCountriesSelects.forEach(c => {
        this.countries = this.countries.filter(cf => { return cf.id != c.id });
      });
    });
  }



  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      let clientTemp: any = this.form.getRawValue();
      let arrCountries: number[] = [];
      let arrContacts: any[] = [];
      this.countriesSelects.forEach(c => arrCountries.push(c.id));
      this.contacts.forEach(c => arrContacts.push(c));

      arrContacts.map(c => {
        c.cliente_tipo_contacto = c.cliente_tipo_contacto.id;
      });
      this.clientSend.paises_extra = arrCountries;
      this.clientSend.datos_contacto = arrContacts;



      this.clientSend.razon_social = clientTemp.razon_social;
      this.clientSend.razon_comercial = clientTemp.razon_comercial;
      this.clientSend.nit = clientTemp.nit;
      this.clientSend.observaciones = clientTemp.observaciones;
      this.clientSend.paises = clientTemp.paises.id;
      this.clientSend.subgrupo_economico = clientTemp.subgrupo_economico.id;
      this.clientSend.tipo_cliente = clientTemp.tipo_cliente.id;
      this.clientSend.usuario_comercial = clientTemp.usuario_comercial.id;


      delete this.clientSend.horarios_cliente
      delete this.clientSend.paises_extras
      
      this.clientSend.horarios = {
        lunes: {
          hora_inicial: null,
          hora_final: null,
        },
        martes: {
          hora_inicial: null,
          hora_final: null,
        },
        miercoles: {
          hora_inicial: null,
          hora_final: null,
        },
        jueves: {
          hora_inicial: null,
          hora_final: null,
        },
        viernes: {
          hora_inicial: null,
          hora_final: null,
        },
        sabado: {
          hora_inicial: null,
          hora_final: null,
        },
        domingo: {
          hora_inicial: null,
          hora_final: null,
        },
        festivos: {
          hora_inicial: null,
          hora_final: null,
        }
      };

      this.clientSend.horarios.lunes.hora_inicial = clientTemp.lunes_hora_inicial || null;
      this.clientSend.horarios.lunes.hora_final = clientTemp.lunes_hora_final;

      this.clientSend.horarios.martes.hora_inicial = clientTemp.martes_hora_inicial;
      this.clientSend.horarios.martes.hora_final = clientTemp.martes_hora_final;

      this.clientSend.horarios.miercoles.hora_inicial = clientTemp.miercoles_hora_inicial;
      this.clientSend.horarios.miercoles.hora_final = clientTemp.miercoles_hora_final;

      this.clientSend.horarios.jueves.hora_inicial = clientTemp.jueves_hora_inicial;
      this.clientSend.horarios.jueves.hora_final = clientTemp.jueves_hora_final;

      this.clientSend.horarios.viernes.hora_inicial = clientTemp.viernes_hora_inicial;
      this.clientSend.horarios.viernes.hora_final = clientTemp.viernes_hora_final;

      this.clientSend.horarios.sabado.hora_inicial = clientTemp.sabado_hora_inicial;
      this.clientSend.horarios.sabado.hora_final = clientTemp.sabado_hora_final;

      this.clientSend.horarios.domingo.hora_inicial = clientTemp.domingo_hora_inicial;
      this.clientSend.horarios.domingo.hora_final = clientTemp.domingo_hora_final;

      this.clientSend.horarios.festivos.hora_inicial = clientTemp.festivos_hora_inicial;
      this.clientSend.horarios.festivos.hora_final = clientTemp.festivos_hora_final;

      delete this.clientSend.pais_nombre;


      this.clientService.updateClient(this.clientSend).subscribe(resp => {

        if (resp.status == 202) {
          swal.fire({
            title: 'Confirmación.',
             text: resp.message,
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
            icon: 'success'
          });
          this.router.navigate(
            ['clientes/datail',this.idClient]
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

  seletedMainCountry(mainCountry) {
    this.countriesSelects = [];
    this.countries = [...this.countriesInput];
    this.countries = this.countries.filter(c => { return c.id != mainCountry.id });
  }

  getTypeClient() {
    this.clientService.getTypeClient().subscribe(resp => {
      this.typeClient = resp;
    });
  }

  getTypeContact() {
    this.clientService.getTypeContact().subscribe(resp => {
      this.typeContact = resp;
    });
  }

  getClientGroups() {
    this.clientService.getClientGroups().subscribe(resp => {
      this.clientGruops = resp;
    });
  }

  getCountry() {
    this.clientService.getCountry().subscribe(resp => {
      this.countries = resp;
      this.countriesInput = [...resp];
    });
  }

  getEconomicSector() {
    this.clientService.getEconomicSector().subscribe(resp => {
      this.economicSectors = resp;
    });
  }

  getComercialAttend() {
    this.clientService.getComercialAttend().subscribe(resp => {
      this.comercialAttend = resp;
    });
  }

  selectCountry(country) {
    const flag = this.countriesTemp.find(cSelect => { return cSelect.id == country.id });
    if (!flag) {
      this.countriesTemp.push(country);
    } else {
      const index = this.countriesTemp.indexOf(flag);
      this.countriesTemp.splice(index, 1)
    }
  }

  selectAll() {
    if (this.countriesTemp.length < this.countriesSelects.length) {
      this.countriesTemp = this.countriesSelectsTemp;
    } else {
      this.countriesTemp = [];
    }
  }

  selectCountriesSend(countrySend) {
    const flag = this.countriesSelectsTemp.find(cSelect => { return cSelect.id == countrySend.id });
    if (!flag) {
      this.countriesSelectsTemp.push(countrySend);
    } else {
      const index = this.countriesSelectsTemp.indexOf(flag);
      this.countriesSelectsTemp.splice(index, 1)
    }
  }

  aceptModal() {
    this.countriesSelectsTemp.forEach(c => { this.countriesSelects.push(c) });
    this.countriesSelectsTemp.forEach(c => {
      const flag = this.countries.find(cSelect => { return cSelect.id == c.id });
      if (flag) {
        const index = this.countries.indexOf(flag);
        this.countries.splice(index, 1)
      }
    });
    this.countriesSelectsTemp = [];
  }

  deleteCountry() {
    this.countriesTemp.forEach(c => { this.countries.push(c); });
    this.countriesTemp.forEach(c => {
      const flag = this.countriesSelects.find(cSelect => { return cSelect.id == c.id });
      if (flag) {
        const index = this.countriesSelects.indexOf(flag);
        this.countriesSelects.splice(index, 1)
      }
    });
    this.countriesTemp = [];
  }

  cancelModal() {
    this.countriesSelectsTemp = [];
  }

  addContact() {
    if (this.formModalContact.invalid) {
      this.formModalContact.markAllAsTouched();
      return;
    } else {
      this.contacts.push({ ...this.formModalContact.getRawValue() });
      this.cancelModalContact()
      this.formModalContact.reset();
    }
  }

  cancelModalContact() {
    this.formModalContact.reset();
  }

  selectAllContacts() {
    if (this.contactsTemp.length < this.contacts.length) {
      this.contactsTemp = this.contacts;
    } else {
      this.contactsTemp = [];
    }

  }

  selectContact(contact) {
    const flag = this.contactsTemp.find(cSelect => { return JSON.stringify(cSelect) == JSON.stringify(contact) });;
    if (!flag) {
      this.contactsTemp.push({ ...contact });
    } else {
      this.contactsTemp = this.contactsTemp.filter(c => { return JSON.stringify(c) != JSON.stringify(contact) });
    }
  }

  deleteContact() {
    this.contactsTemp.forEach(c => {
      const flag = this.contacts.find(cSelect => { return JSON.stringify(cSelect) == JSON.stringify(c) });
      if (flag) {
        this.contacts = this.contacts.filter(cT => { return JSON.stringify(cT) != JSON.stringify(c) });
      }
    });
    this.contactsTemp = [];
  }


}
