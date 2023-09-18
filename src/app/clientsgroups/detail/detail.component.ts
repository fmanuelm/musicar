import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClientesgruposService } from '../service/clientesgrupos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private router: Router, private clienteGroup: ClientesgruposService, private route: ActivatedRoute) { }
  private idGroup: any;
  form: FormGroup;
  clientesAgregados : any[] = [];
  nombre:string='';
  ngOnInit(): void {
    this.idGroup = this.route.snapshot.paramMap.get('id');
    
    this.getClienteGrupo(this.idGroup);
    this.getClientesGrupos(this.idGroup);
  }

  getClienteGrupo(id)
  {
    this.clienteGroup.getClienteGrupo(id).subscribe((resp)=>{
      
      this.nombre = resp.nombre;
    });
  }
  getClientesGrupos(id)
  {
    this.clienteGroup.getClientesGrupos(id).subscribe((resp)=>{
      console.log(resp);
      this.clientesAgregados = resp;
    });
  }
  deleteClient() {
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
        console.log("se eliminara el grupo");
        if (this.clientesAgregados.length > 0)
        {
          const observables = this.clientesAgregados.map(cliente => {
            let id_relation = cliente.id_relacion;
            return this.clienteGroup.deleteRelationClienteGrupo(id_relation);
          });
          forkJoin(observables).subscribe(
            () => {
              console.log("proximo a eliminar el grupo");
              this.clienteGroup.deleteClientGroup(this.idGroup).subscribe(resp => {
                console.log("linea 67");
                console.log(resp);
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
                    ['clientes-grupos/list']
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
            });
        }
        else {
          this.clienteGroup.deleteClientGroup(this.idGroup).subscribe(resp => {
                    
            console.log(resp);
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
                ['clientes-grupos/list']
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
      }
    })
  }

  editClient() {
    this.router.navigate(
      ['clientes-grupos/edit', this.idGroup]
    );
  }


}
