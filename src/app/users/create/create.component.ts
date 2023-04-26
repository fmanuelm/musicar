import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../clients/interfaces/Country.interface';
import { Client } from '../../clients/interfaces/Client.interface';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  countries: Country[];
  clients: Client[];
  typeUser: any[];
  attendantUser: any[];
  disponibility: any[];
  states_user: any[] = [
    { estado: 'Activo', value: true }, { estado: 'Inactivo', value: false }
  ];

  points: any[];
  pointsGroups: any[];
  regionals: any[];

  constructor(private userService: UsersService, private _formBuilder: FormBuilder) { }

  async ngOnInit() {
    await this.getCountries();
    await this.getTypeUser();
    await this.getAttedantUser();
    await this.getDisponibility();

    this.form = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      tUsuario: [null, [Validators.required]],
      cOperacion: [null, [Validators.required]],
      disponibilidad: [null, [Validators.required]],
      estado_usuario: [null, [Validators.required]],
      telefono: [null, [Validators.required, Validators.min(1)]],
      correo: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      usuario: [null, [Validators.required]],
      password: [null, [Validators.required]],
      asociacion: [null, [Validators.required]],

    });

    this.form.get('pais').valueChanges.subscribe(p => {
      this.clients = [];
      if (p) {
        this.getClientsByCountry(p);
      }
    });

    this.form.get('tUsuario').valueChanges.subscribe(tu => {
      if (tu == 18 || tu == 19 || tu == 20) {
        this.form.controls['asociacion'].setValidators([Validators.required])
        this.form.controls['asociacion'].updateValueAndValidity()
      } else {
        this.form.controls['asociacion'].setValidators([])
        this.form.controls['asociacion'].updateValueAndValidity()
      }

    });

    this.form.get('cliente').valueChanges.subscribe(p => {
      this.points = [];
      this.pointsGroups = [];
      this.regionals = [];
      this.form.get('asociacion').setValue(null)
      if (p) {
        this.getPointsByClient(p);
        this.getPointsGroupsByClient(p);
        this.getRegionalByClient(p);
      }
    });

  }

  getPointsByClient(idClient) {
    this.userService.getPointsByClient(idClient).subscribe(resp => {
      this.points = resp;
    })
  }

  getPointsGroupsByClient(idClient) {
    this.userService.getPointsGroupsByClient(idClient).subscribe(resp => {
      this.pointsGroups = resp;
    })
  }

  getRegionalByClient(idClient) {
    this.userService.getRegionalByClient(idClient).subscribe(resp => {
      this.regionals = resp;
    })
  }

  getCountries() {
    this.userService.getCountries().subscribe(resp => {
      this.countries = resp;
    })
  }

  getTypeUser() {
    this.userService.getTypeUser().subscribe(resp => {
      this.typeUser = resp;
    })
  }

  getAttedantUser() {
    this.userService.getAttedantUser().subscribe(resp => {
      this.attendantUser = resp;
    })
  }

  getDisponibility() {
    this.userService.getDisponibility().subscribe(resp => {
      this.disponibility = resp;
    })
  }

  getClientsByCountry(idCountry) {
    this.userService.getClientsByCountry(idCountry).subscribe(resp => {
      this.clients = resp;
    })
  }

  clearForm() {
    this.form.reset();
  }

  sendForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      const formData = this.form.getRawValue();

      let asociacion = null;
      let asociaciones = null;
      if (formData.tUsuario == 18) {
        asociacion = 1;
        asociaciones = formData.asociacion;
      }
      if (formData.tUsuario == 20) {
        asociacion = 2;
        asociaciones = formData.asociacion;
      }
      if (formData.tUsuario == 19) {
        asociacion = 3;
        asociaciones = formData.asociacion;
      }
      const dataSend = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        usuario: formData.usuario,
        correo: formData.correo,
        password: formData.password,
        telefono: formData.telefono,
        estado: formData.estado_usuario,
        usuarios_tipo: formData.tUsuario,
        cliente: formData.cliente,
        centro_operacion_atiende: formData.cOperacion,
        usuarios_disponibilidad: formData.disponibilidad,
        asociacion,
        asociaciones,
      };


      this.userService.storeUser(dataSend).subscribe(resp => {

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

}
