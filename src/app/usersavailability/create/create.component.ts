import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersavailabilityService } from '../usersavailability.service';
import swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
declare var $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  formModalContact: FormGroup;
  public lunesMin;
  public lunesMax;
  public usuariosSelects:any[]=[];
  public usuariosSelects2:any[]=[];
  public usuariosTemp:any[]=[];
  public usuarios:any[]=[];
  constructor(private _formBuilder: FormBuilder, private userAvalability: UsersavailabilityService) { }

  ngOnInit(): void {
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
    this.getUsuariosById();
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

  getUsuariosById()
  {
    this.userAvalability.getUsuariosById().subscribe(resp=>{
      //console.log(resp);
      this.usuarios = resp;
      console.log(resp);
    });
    
  }
  deleteUsuarios()
  {
    for(let i = 0; i < this.usuariosSelects2.length; i++)
    {
      const id = this.usuariosSelects2[i].id;
      let tempUsuarios = this.usuariosSelects.filter(elem => elem.id !== id);
      this.usuariosSelects = tempUsuarios;
    }
    this.usuariosSelects2 = [];
  }
  selectAll(users)
  {
    //console.log("tama: " + users.length);
    this.usuariosSelects2 = users;
  }
  selectUser(user)
  {
    
    let tempUsuariosSelects = this.usuariosSelects2;
    if (this.usuariosSelects2.length > 0)
    {
      
      for(let i = 0; i < this.usuariosSelects2.length; i++)
      {
        const id = this.usuariosSelects2[i].id;
        
        if (id === user.id)
        {
          tempUsuariosSelects.splice(i, 1);
        }
        else {
          
          tempUsuariosSelects.push(user);
        }
      }
    }
    else {
      tempUsuariosSelects.push(user);
    }
    this.usuariosSelects2 = tempUsuariosSelects;
    
  }
  selectAllSend(usuarios)
  {

  }
  selectUsuariosSend(usuario)
  {
    console.log("es: ");
    console.log(usuario);
    const elem = this.usuariosTemp.find(cSelect => { return cSelect.id == usuario.id });
    if (!elem) {
      this.usuariosTemp.push(usuario);
      console.log("agregado");
    } else {
      const index = this.usuariosTemp.indexOf(elem);
      this.usuariosTemp.splice(index, 1);
      console.log("quitado");

    }
    console.log("elementos agregados: " + this.usuariosTemp.length);
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
  sendForm() {
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
      let datos = {};
      
      const observables = this.usuariosSelects.map(usuario => {
        datos = {
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
          usuarios: usuario.id
        }
        console.log(datos);
        return this.userAvalability.createDisponibilidad(datos);
        
        
      });
      
      forkJoin(observables).subscribe(
        () => {
          console.log('Todas las llamadas se han completado');
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
        },
        error => {
          console.error('Ocurrió un error:', error);
          swal.fire({
            title: 'Error.',
            text: "Se ha producido un error inesperado, intente otra vez",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-success",
            },
            icon: 'error'
          });
        }
      );
    }
  }
  clearForm()
  {
    this.form.reset();
    this.usuariosSelects = [];
  }
  cancelModal() {

  }
  
  aceptModal()
  {
    //alert();
    //this.clientesAgregados = this.clientesTemp;
    console.log("cantidad agregados: " + this.usuariosTemp.length);
    for (let i = 0; i < this.usuariosTemp.length; i++) {
      const id = this.usuariosTemp[i].id;
      const existsInA = this.usuariosSelects.some(obj => obj.id === id);
      if (!existsInA) {
        this.usuariosSelects.push(this.usuariosTemp[i]);
      }
    }
    
  }
}
