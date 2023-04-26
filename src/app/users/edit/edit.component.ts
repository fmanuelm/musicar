import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Country } from '../../clients/interfaces/Country.interface';
import { Client } from '../../clients/interfaces/Client.interface';
import { UsersService } from '../service/users.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  form: FormGroup;
  states_user: any[] = [
    { estado: 'Activo', value: true }, { estado: 'Inactivo', value: false }
  ];
  
  clients: Client[];
  disponibility: any[];
  attendantUser: any[];
  typeUser: any[];
  points: any[];
  pointsGroups: any[];
  regionals: any[];
  countries: Country[];
  user: any;
  idUser: string;

  constructor(private userService: UsersService, private _formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {

    this.idUser = this.route.snapshot.paramMap.get('id');
    await this.getCountries();
    await this.getTypeUser();
    await this.getAttedantUser();
    await this.getDisponibility();
    await this.getUserById(this.idUser);

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
      password: [null],
      asociacion: [null, [Validators.required]],

    });


    this.form.get('pais').valueChanges.subscribe(p => {
      this.clients = [];
      if (p) {
        this.getClientsByCountry(p.id);
      }
    });

    this.form.get('tUsuario').valueChanges.subscribe(tu => {
      if (tu) {
        if (tu == 18 || tu == 19 || tu == 20) {
          this.form.controls['asociacion'].setValidators([Validators.required])
          this.form.controls['asociacion'].updateValueAndValidity()
        } else {
          this.form.controls['asociacion'].setValidators([])
          this.form.controls['asociacion'].updateValueAndValidity()
        }
      }

    });

    this.form.get('cliente').valueChanges.subscribe(p => {
      this.points = [];
      this.pointsGroups = [];
      this.regionals = [];
      this.form.get('asociacion').setValue(null)
      if (p) {
        this.getPointsByClient(p.id);
        this.getPointsGroupsByClient(p.id);
        this.getRegionalByClient(p.id);
      }
    });
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }

  async getUserById(id) {
    await this.userService.getUserById(id).subscribe(resp => {
      this.user = resp;
      this.form.get('pais').setValue(this.countries.find(c => c.id == this.user.centro_operacion_atiende.paises.id));
      this.form.get('tUsuario').setValue(this.typeUser.find(c => c.id == this.user.usuarios_tipo.id));
      this.form.get('cOperacion').setValue(this.attendantUser.find(c => c.id == this.user.centro_operacion_atiende.id));
      this.form.get('disponibilidad').setValue(this.disponibility.find(c => c.id == this.user.usuarios_disponibilidad.id));
      this.form.get('estado_usuario').setValue(this.states_user.find(c => c.value == this.user.estado));


      this.form.get('nombre').setValue(this.user.nombre);
      this.form.get('apellido').setValue(this.user.apellido);
      this.form.get('telefono').setValue(this.user.telefono);
      this.form.get('correo').setValue(this.user.correo);
      this.form.get('usuario').setValue(this.user.usuario);
    });
  }

  getPointsByClient(idClient) {
    this.userService.getPointsByClient(idClient).subscribe(resp => {
      if (resp.status) {
        this.points = [];
      } else {
        this.points = resp;
        if (this.user.usuarios_tipo.id == 18) {
          this.form.get('asociacion').setValue(this.points.find(c => c.id == this.user.puntos_asociados[0].id));
        }
      }
    })
  }

  getPointsGroupsByClient(idClient) {
    this.userService.getPointsGroupsByClient(idClient).subscribe(resp => {
      if (resp.status) {
        this.pointsGroups = [];
      } else {
        this.pointsGroups = resp;
        if (this.user.usuarios_tipo.id == 20) {
          this.form.get('asociacion').setValue(this.pointsGroups.find(c => c.id == this.user.grupos_asociados[0].puntosgrupos.id));
        }
      }
    })
  }

  getRegionalByClient(idClient) {
    this.userService.getRegionalByClient(idClient).subscribe(resp => {
      this.regionals = resp;
      if (resp.status) {
        this.regionals = [];
      } else {
        this.regionals = resp;
        if (this.user.usuarios_tipo.id == 19) {
          this.form.get('asociacion').setValue(this.regionals.find(c => c.id == this.user.regionales_asociadas[0].id));
        }
      }
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
      this.form.get('cliente').setValue(this.clients.find(c => c.id == this.user.clientes_asociados[0].cliente.id));

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
      if (formData.tUsuario.id == 18) {
        asociacion = 1;
        asociaciones = formData.asociacion.id;
      }
      if (formData.tUsuario.id == 20) {
        asociacion = 2;
        asociaciones = formData.asociacion.id;
      }
      if (formData.tUsuario.id == 19) {
        asociacion = 3;
        asociaciones = formData.asociacion.id;
      }

      const dataSend = {
        id: this.user.id,
        nombre: formData.nombre,
        apellido: formData.apellido,
        usuario: formData.usuario,
        correo: formData.correo,
        password: formData.password ? formData.password : this.user.password,
        telefono: formData.telefono,
        estado: formData.estado_usuario.value,
        usuarios_tipo: formData.tUsuario.id,
        cliente: formData.cliente.id,
        centro_operacion_atiende: formData.cOperacion.id,
        usuarios_disponibilidad: formData.disponibilidad.id,
        asociacion,
        asociaciones,
      };



      this.userService.updateUser(dataSend).subscribe(resp => {

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
            ['usuarios/list']
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

}
