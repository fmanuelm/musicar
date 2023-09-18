import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersavailabilityService } from '../usersavailability.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public idUsuario:any;
  public usuariosSelects:any[]=[];
  public nombre: string = '';
  public openingHours: any = {
    lunes : {
      hora_inicial: {},
      hora_final: {}
    },
    martes : {
      hora_inicial: {},
      hora_final: {}
    },
    miercoles : {
      hora_inicial: {},
      hora_final: {}
    },
    jueves : {
      hora_inicial: {},
      hora_final: {}
    },
    viernes : {
      hora_inicial: {},
      hora_final: {}
    },
    sabado : {
      hora_inicial: {},
      hora_final: {}
    },
    domingo : {
      hora_inicial: {},
      hora_final: {}
    },
    festivos : {
      hora_inicial: {},
      hora_final: {}
    },
  };
  public horario_id: number;
  form: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public usersavailabilityService: UsersavailabilityService) { }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    this.getUsuario(this.idUsuario);
    
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
    this.getUsuarioDisponibilidad(this.idUsuario);
  }
  getUsuario(id)
  {
    this.usersavailabilityService.getUsuario(id).subscribe((resp)=>{
      let datos = {
        nombres:resp.nombre,
        apellidos:resp.apellido,
        tipo_usuario:resp.usuarios_tipo.tipo_usuario,
        disponibilidad:resp.usuarios_disponibilidad.estado_usuario
      };
      this.usuariosSelects.push(datos);
      console.log(resp);
      this.nombre = datos.nombres;
    });
  }
  getUsuarioDisponibilidad(id)
  {
    this.usersavailabilityService.getUsuarioHorarios(id).subscribe((resp)=>{
      console.log("line 106: ");

      console.log(resp);
      
      if (resp.length > 0)
      {
        this.openingHours = resp[0].default;
        this.horario_id = resp[0].id;
      }
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
        this.usersavailabilityService.deleteDisponibilidad(this.horario_id).subscribe(resp => {
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
