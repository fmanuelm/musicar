import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersavailabilityService } from '../usersavailability.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public idUsuario:any;
  public usuariosSelects:any[]=[];
  public nombre: string = '';
  public disponibilidades: any[]=[];
  public tieneHorarioNoDisponible = false;
  public id_fechaNoDisponible:number = null;
  public datosHorasDias:any={};
  public tieneHorarioDisponibilidad:any = false;
  form: FormGroup;
  public date: Date;
  dateList: any[] = [];
  public minDate: Date;
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public usersavailabilityService: UsersavailabilityService) { }

    ngOnInit(): void {
      this.idUsuario = this.route.snapshot.paramMap.get('id');
      
      this.minDate = new Date();
      this.date = new Date();
      this.form = this._formBuilder.group({
        lunes_hora_inicial: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
        lunes_hora_final: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
  
        martes_hora_inicial: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
        martes_hora_final: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
  
        miercoles_hora_inicial: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
        miercoles_hora_final: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
  
        jueves_hora_inicial: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
        jueves_hora_final: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
  
        viernes_hora_inicial: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
        viernes_hora_final: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
  
        sabado_hora_inicial: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
        sabado_hora_final: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
  
        domingo_hora_inicial: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
        domingo_hora_final: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
  
        festivos_hora_inicial: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
        festivos_hora_final: ['', [Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
        disponibilidad: ['', [Validators.required]],
        date: []
      });
      this.form.valueChanges.subscribe(() => {
        const lunes_hora_inicial = this.form.controls['lunes_hora_inicial'].value;
        const lunes_hora_final = this.form.controls['lunes_hora_final'].value;
  
        if (lunes_hora_inicial && lunes_hora_final && lunes_hora_inicial >= lunes_hora_final) {
          this.form.controls['lunes_hora_inicial'].setErrors({ 'incorrect': true });
          this.form.controls['lunes_hora_final'].setErrors({ 'incorrect': true });
        } else {
          this.form.controls['lunes_hora_inicial'].setErrors(null);
          this.form.controls['lunes_hora_final'].setErrors(null);
        }
  
  
        const martes_hora_inicial = this.form.controls['martes_hora_inicial'].value;
        const martes_hora_final = this.form.controls['martes_hora_final'].value;
  
        if (martes_hora_inicial && martes_hora_final && martes_hora_inicial >= martes_hora_final) {
          this.form.controls['martes_hora_inicial'].setErrors({ 'incorrect': true });
          this.form.controls['martes_hora_final'].setErrors({ 'incorrect': true });
        } else {
          this.form.controls['martes_hora_inicial'].setErrors(null);
          this.form.controls['martes_hora_final'].setErrors(null);
        }
  
  
        const miercoles_hora_inicial = this.form.controls['miercoles_hora_inicial'].value;
        const miercoles_hora_final = this.form.controls['miercoles_hora_final'].value;
  
        if (miercoles_hora_inicial && miercoles_hora_final && miercoles_hora_inicial >= miercoles_hora_final) {
          this.form.controls['miercoles_hora_inicial'].setErrors({ 'incorrect': true });
          this.form.controls['miercoles_hora_final'].setErrors({ 'incorrect': true });
        } else {
          this.form.controls['miercoles_hora_inicial'].setErrors(null);
          this.form.controls['miercoles_hora_final'].setErrors(null);
        }
  
  
        const jueves_hora_inicial = this.form.controls['jueves_hora_inicial'].value;
        const jueves_hora_final = this.form.controls['jueves_hora_final'].value;
  
        if (jueves_hora_inicial && jueves_hora_final && jueves_hora_inicial >= jueves_hora_final) {
          this.form.controls['jueves_hora_inicial'].setErrors({ 'incorrect': true });
          this.form.controls['jueves_hora_final'].setErrors({ 'incorrect': true });
        } else {
          this.form.controls['jueves_hora_inicial'].setErrors(null);
          this.form.controls['jueves_hora_final'].setErrors(null);
        }
  
  
        const viernes_hora_inicial = this.form.controls['viernes_hora_inicial'].value;
        const viernes_hora_final = this.form.controls['viernes_hora_final'].value;
  
        if (viernes_hora_inicial && viernes_hora_final && viernes_hora_inicial >= viernes_hora_final) {
          this.form.controls['viernes_hora_inicial'].setErrors({ 'incorrect': true });
          this.form.controls['viernes_hora_final'].setErrors({ 'incorrect': true });
        } else {
          this.form.controls['viernes_hora_inicial'].setErrors(null);
          this.form.controls['viernes_hora_final'].setErrors(null);
        }
  
  
        const sabado_hora_inicial = this.form.controls['sabado_hora_inicial'].value;
        const sabado_hora_final = this.form.controls['sabado_hora_final'].value;
  
        if (sabado_hora_inicial && sabado_hora_final && sabado_hora_inicial >= sabado_hora_final) {
          this.form.controls['sabado_hora_inicial'].setErrors({ 'incorrect': true });
          this.form.controls['sabado_hora_final'].setErrors({ 'incorrect': true });
        } else {
          this.form.controls['sabado_hora_inicial'].setErrors(null);
          this.form.controls['sabado_hora_final'].setErrors(null);
        }
  
  
        const domingo_hora_inicial = this.form.controls['domingo_hora_inicial'].value;
        const domingo_hora_final = this.form.controls['domingo_hora_final'].value;
  
        if (domingo_hora_inicial && domingo_hora_final && domingo_hora_inicial >= domingo_hora_final) {
          this.form.controls['domingo_hora_inicial'].setErrors({ 'incorrect': true });
          this.form.controls['domingo_hora_final'].setErrors({ 'incorrect': true });
        } else {
          this.form.controls['domingo_hora_inicial'].setErrors(null);
          this.form.controls['domingo_hora_final'].setErrors(null);
        }
  
        const festivos_hora_inicial = this.form.controls['festivos_hora_inicial'].value;
        const festivos_hora_final = this.form.controls['festivos_hora_final'].value;
  
        if (festivos_hora_inicial && festivos_hora_final && festivos_hora_inicial >= festivos_hora_final) {
          this.form.controls['festivos_hora_inicial'].setErrors({ 'incorrect': true });
          this.form.controls['festivos_hora_final'].setErrors({ 'incorrect': true });
        } else {
          this.form.controls['festivos_hora_inicial'].setErrors(null);
          this.form.controls['festivos_hora_final'].setErrors(null);
        }
  
      });
      this.getUsuario(this.idUsuario);
      this.getUsuarioHorariosNoDisponible(this.idUsuario);
      this.getDisponibilidadesAll();
      this.getUsuarioDisponibilidad(this.idUsuario);
    }
    getDisponibilidadesAll()
    {
      this.usersavailabilityService.getDisponibilidadesAll().subscribe(resp=>{
        this.disponibilidades = resp;
        console.log("all disponibilidaes");
        console.log(resp);
      });
    }
    getUsuarioDisponibilidad(id)
    {
      this.usersavailabilityService.getUsuarioHorarios(id).subscribe((resp)=>{
        console.log("getUsuarioDisponibilidad");
        //console.log(resp);
        //this.openingHours = resp[0].default;
        this.tieneHorarioDisponibilidad = false;
        if (resp.length > 0)
        {
          this.tieneHorarioDisponibilidad = true;
          this.form.get('lunes_hora_inicial').setValue(resp[0].default.lunes.hora_inicial);
          this.form.get('lunes_hora_final').setValue(resp[0].default.lunes.hora_final);

          this.form.get('martes_hora_inicial').setValue(resp[0].default.martes.hora_inicial);
          this.form.get('martes_hora_final').setValue(resp[0].default.martes.hora_final);

          this.form.get('miercoles_hora_inicial').setValue(resp[0].default.miercoles.hora_inicial);
          this.form.get('miercoles_hora_final').setValue(resp[0].default.miercoles.hora_final);

          this.form.get('jueves_hora_inicial').setValue(resp[0].default.jueves.hora_inicial);
          this.form.get('jueves_hora_final').setValue(resp[0].default.jueves.hora_final);
          
          this.form.get('viernes_hora_inicial').setValue(resp[0].default.viernes.hora_inicial);
          this.form.get('viernes_hora_final').setValue(resp[0].default.viernes.hora_final);

          this.form.get('sabado_hora_inicial').setValue(resp[0].default.sabado.hora_inicial);
          this.form.get('sabado_hora_final').setValue(resp[0].default.sabado.hora_final);

          this.form.get('domingo_hora_inicial').setValue(resp[0].default.domingo.hora_inicial);
          this.form.get('domingo_hora_final').setValue(resp[0].default.domingo.hora_final);

          this.form.get('festivos_hora_inicial').setValue(resp[0].default.festivos.hora_inicial);
          this.form.get('festivos_hora_final').setValue(resp[0].default.festivos.hora_final);
          
        }
        
      });
    }
    getUsuarioHorariosNoDisponible(id)
    {
      this.usersavailabilityService.getUsuarioHorariosNoDisponible(id).subscribe(resp=>{
        if (resp.status !== 204 || resp.status !== 401 || resp.status !== 404)
        {
          if (resp.length > 0)
          {
            this.tieneHorarioNoDisponible = true;
            this.id_fechaNoDisponible = resp[0].id;
            let json_FechasNodisponible = resp[0].fechas_no_disponibilidad;
            for (const clave in json_FechasNodisponible) {
              if (json_FechasNodisponible.hasOwnProperty(clave)) {
                const valor = json_FechasNodisponible[clave];
                this.dateList.push(valor);
              }
            }
          }
          else {
            this.tieneHorarioNoDisponible = false;  
          }
        }
        else
        {
          this.tieneHorarioNoDisponible = false;
        }
        console.log("horarios no disponible: ");
        console.log(resp);
      });
    }
    convertirFecha(fechaString) {
      const fecha = new Date(fechaString);
    
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const año = fecha.getFullYear();
    
      return `${dia}/${mes}/${año}`;
    }
    setDate() {
      let hour:any;
      let min:any;
      let res = this.convertirFecha(this.form.get('date').value);
      
      if (this.dateList.includes(res) !== true)
      {
        this.dateList.push(res);
      }
      else {
        swal.fire({
          title: 'Error.',
          text: "Este fecha fue agregada",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success",
          },
          icon: 'error'
        });
      }
    }
    validateHoras()
    {
      if (this.form.get('lunes_hora_inicial').value !== '' && this.form.get('lunes_hora_final').value !== '')
      {
        return true;
      }
      if (this.form.get('martes_hora_inicial').value !== '' && this.form.get('martes_hora_final').value !== '')
      {
        return true;
      }
      if (this.form.get('miercoles_hora_inicial').value !== '' && this.form.get('miercoles_hora_final').value !== '')
      {
        return true;
      }
      if (this.form.get('jueves_hora_inicial').value !== '' && this.form.get('jueves_hora_final').value !== '')
      {
        return true;
      }
      if (this.form.get('viernes_hora_inicial').value !== '' && this.form.get('viernes_hora_final').value !== '')
      {
        return true;
      }
      if (this.form.get('sabado_hora_inicial').value !== '' && this.form.get('sabado_hora_final').value !== '')
      {
        return true;
      }
      if (this.form.get('domingo_hora_inicial').value !== '' && this.form.get('domingo_hora_final').value !== '')
      {
        return true;
      }
      if (this.form.get('festivos_hora_inicial').value !== '' && this.form.get('festivos_hora_final').value !== '')
      {
        return true;
      }
      return false;
    }
    validarHora(control) {
      const hora = control.value;
      if (!hora.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
        return { horaInvalida: true };
      }
      return null;
    }
    sendForm()
    {
      if (this.validateHoras() === false)
      {
        swal.fire({
          title: 'Error.',
          text: "Debe colocar al menos un horario",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success",
          },
          icon: 'error'
        });
      }
      else {
        // guardar disponibilidad de usuario
        let datos = {
          id: Number(this.idUsuario),
          usuarios_disponibilidad: this.form.get('disponibilidad').value,
          nombre: this.usuariosSelects[0].nombres,
          apellido: this.usuariosSelects[0].apellidos,
          usuario: this.usuariosSelects[0].usuario,
          correo: this.usuariosSelects[0].correo,
          password: this.usuariosSelects[0].password,
          telefono: this.usuariosSelects[0].telefono,
          estado: this.usuariosSelects[0].estado,
          usuarios_tipo: this.usuariosSelects[0].tipo_usuario_id,
          centro_operacion_atiende: this.usuariosSelects[0].centro_operacion_atiende
          
        };
        console.log("datos a guardar");
        console.log(datos);
        this.usersavailabilityService.modificarUsuario(datos).subscribe(resp=>{

          console.log("se ha guardado la disponibilidad");
          console.log(resp);
        });
        // guardar fechas no disponible
        if (this.tieneHorarioNoDisponible === true)
        {
          if (this.dateList.length > 0)
          {
            // modifica
            const fechasNodisponible = {};
            for (let i = 0; i < this.dateList.length; i++) {
              fechasNodisponible[i + 1] = this.dateList[i];
            }
            let datosFechas = {
              "fechas_no_disponibilidad": fechasNodisponible,
              "usuarios": Number(this.idUsuario)
            }
            console.log(datosFechas);
            this.usersavailabilityService.modificarFechaNoDisponible(datosFechas).subscribe((resp)=>{
              console.log("modifico las fechas no disponible");
              console.log(resp);
            });
          }
          else {
            // eliminalo todos
            let datosFechas = {
              "id": this.id_fechaNoDisponible,
              "fechas_no_disponibilidad": {},
              "usuarios": Number(this.idUsuario)
            }
            this.usersavailabilityService.modificarFechaNoDisponible(datosFechas).subscribe((resp)=>{
              console.log("elimino las fechas no disponible");
              console.log(resp);
            });
          }
          
        }
        else {
          if (this.dateList.length > 0)
          {
            const fechasNodisponible = {};
            for (let i = 0; i < this.dateList.length; i++) {
              fechasNodisponible[i + 1] = this.dateList[i];
            }
            let datosFechas = {
              "fechas_no_disponibilidad": fechasNodisponible,
              "usuarios": Number(this.idUsuario)
            }
            this.usersavailabilityService.createFechaNoDisponible(datosFechas).subscribe((resp)=>{
              console.log("creo las fechas no disponible");
              console.log(resp);
            });
          }
        }
        // guardar horarios disponible
        this.datosHorasDias = {
          default: {
            lunes: {
              hora_inicial : this.form.get('lunes_hora_inicial').value,
              hora_final : this.form.get('lunes_hora_final').value
            },
            martes: {
              hora_inicial : this.form.get('martes_hora_inicial').value,
              hora_final : this.form.get('martes_hora_final').value
            },
            miercoles: {
              hora_inicial : this.form.get('miercoles_hora_inicial').value,
              hora_final : this.form.get('miercoles_hora_final').value
            },
            jueves: {
              hora_inicial : this.form.get('jueves_hora_inicial').value,
              hora_final : this.form.get('jueves_hora_final').value
            },
            viernes: { 
              hora_inicial : this.form.get('viernes_hora_inicial').value, 
              hora_final : this.form.get('viernes_hora_final').value
            },
            sabado: {
              hora_inicial : this.form.get('sabado_hora_inicial').value,
              hora_final : this.form.get('sabado_hora_final').value
            },
            domingo: {
              hora_inicial : this.form.get('domingo_hora_inicial').value, 
              hora_final : this.form.get('domingo_hora_final').value
            },

            festivos: {
              hora_inicial : this.form.get('festivos_hora_inicial').value,
              hora_final : this.form.get('festivos_hora_final').value
            },
          },
          horarios: {
            lunes: {
              hora_inicial : this.convertirHora(this.form.get('lunes_hora_inicial').value),
              hora_final : this.convertirHora(this.form.get('lunes_hora_final').value)
            },
            martes: {
              hora_inicial : this.convertirHora(this.form.get('martes_hora_inicial').value),
              hora_final : this.convertirHora(this.form.get('martes_hora_final').value)
            },
            miercoles: {
              hora_inicial : this.convertirHora(this.form.get('miercoles_hora_inicial').value),
              hora_final : this.convertirHora(this.form.get('miercoles_hora_final').value)
            },
            jueves: {
              hora_inicial : this.convertirHora(this.form.get('jueves_hora_inicial').value),
              hora_final : this.convertirHora(this.form.get('jueves_hora_final').value)
            },
            viernes: { 
              hora_inicial : this.convertirHora(this.form.get('viernes_hora_inicial').value), 
              hora_final : this.convertirHora(this.form.get('viernes_hora_final').value)
            },
            sabado: {
              hora_inicial : this.convertirHora(this.form.get('sabado_hora_inicial').value),
              hora_final : this.convertirHora(this.form.get('sabado_hora_final').value)
            },
            domingo: {
              hora_inicial : this.convertirHora(this.form.get('domingo_hora_inicial').value), 
              hora_final : this.convertirHora(this.form.get('domingo_hora_final').value)
            },
            festivos: {
              hora_inicial : this.convertirHora(this.form.get('festivos_hora_inicial').value),
              hora_final : this.convertirHora(this.form.get('festivos_hora_final').value)
            },
          },
          usuarios: this.idUsuario
        }
        // si al abrir no habia fecha
        if (this.tieneHorarioDisponibilidad === true)
        {
          this.usersavailabilityService.modificarDisponibilidad(this.datosHorasDias).subscribe(resp=>{
            console.log("modificarDisponibilidad:");
            console.log(resp);
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
                ['disponibilidad-usuario/detail', this.idUsuario]
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
        else {
          this.usersavailabilityService.createDisponibilidad(this.datosHorasDias).subscribe(resp=>{
            console.log("crearDisponibilidad:");
            console.log(resp);
            if (resp.status == 201) {
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
                ['disponibilidad-usuario/detail', this.idUsuario]
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
    
    convertirHora(horaMilitar)
    {
      const horaMilitarArray = horaMilitar.split(':');
      const hora = parseInt(horaMilitarArray[0], 10);
      const minutos = parseInt(horaMilitarArray[1], 10);

      // Verificar si es AM o PM
      const esPM = hora >= 12;
      
      // Convertir a formato no militar
      let horaNoMilitarHora = esPM ? (hora - 12) : hora;
      let horaNoMilitar = horaNoMilitarHora.toString().padStart(2, '0');
      const amPm = esPM ? 'PM' : 'AM';

      horaNoMilitar += `:${minutos.toString().padStart(2, '0')} ${amPm}`;
      
      return horaNoMilitar;
    }
  
    removeDate(index: number) {
      this.dateList.splice(index, 1);
    }
    getUsuario(id)
    {
      this.usersavailabilityService.getUsuario(id).subscribe((resp)=>{
        let datos = {
          nombres:resp.nombre,
          apellidos:resp.apellido,
          tipo_usuario:resp.usuarios_tipo.tipo_usuario,
          tipo_usuario_id:resp.usuarios_tipo.id,
          disponibilidad:resp.usuarios_disponibilidad.estado_usuario,
          disponibilidad_id:resp.usuarios_disponibilidad.id,
          usuario: resp.usuario,
          telefono: resp.telefono,
          estado: resp.estado,
          password: resp.password,
          correo: resp.correo,
          centro_operacion_atiende: resp.centro_operacion_atiende.id
        };
        this.usuariosSelects.push(datos);
        console.log(resp);
        this.form.get('disponibilidad').setValue(resp.usuarios_disponibilidad.id);
        this.nombre = datos.nombres;
      });
    }
    editUsuario()
    {
      this.router.navigate(['disponibilidad-usuario/edit', this.idUsuario]);
    }
    deleteUsuario()
    {
      swal.fire({
        title: 'Alerta',
        text: "¿Confirma que desea realizar la eliminación del registro?",
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        confirmButtonText: 'Aceptar',
        buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.usersavailabilityService.deleteDisponibilidad(this.idUsuario).subscribe(resp => {
            if (resp.status == 200) {
              swal.fire(
                {
                  title: 'Confirmación',
                  text: 'El regitro se elimino de manera correcta.',
                  icon: 'success',
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                  buttonsStyling: false
                }
              )
              this.router.navigate(
                ['disponibilidad-usuario/list']
              );
            } else {
              swal.fire(
                {
                  title: 'Error',
                  text: resp.message,
                  icon: 'error',
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                  buttonsStyling: false
                }
              )
            }
  
          });
        }
      })
    }

}
