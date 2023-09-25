import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesgruposService } from '../service/clientesgrupos.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  
  public clientesAgregados = [];
  public clientesAgregadosSeleccionados:[] = [];
  public clientes = [];
  public cols = [
    { field: 'nombre', header: 'País' },
  ];
  public clientesSelectsTemp : any[] = [];
  public clientesTemp = [];
  public principalSelected : number;
  public clientesSelects : any = [];
  public id_grupo: any;
  public datosCliente: any = {};
  public id_relacion_clientes:any[]=[];
  public principal:number=null;
  public errorGuardando = '';
  constructor(private _formBuilder: FormBuilder, private _clientsgroupsservice: ClientesgruposService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.id_grupo = this.route.snapshot.paramMap.get('id');
    this.form = this._formBuilder.group({
      nombre_grupo: [null, [Validators.required]],
    });
    
    this.clientesAgregados = [
      
    ];

    this.getClientesGrupos(this.id_grupo);
    this.getClienteGrupo(this.id_grupo);
    this.getClients();
  }
  getClientesGrupos(id)
  {
    this._clientsgroupsservice.getClientesGrupos(id).subscribe((resp)=>{
      
      this.clientesAgregados = resp;
      for(let clienteAgregado of resp)
      {
        this.id_relacion_clientes.push(clienteAgregado.id_relacion);
        if (clienteAgregado.cliente_principal === true)
        {
          this.principal = clienteAgregado.id;
        }
      }
    });
  }
  getClienteGrupo(id)
  {
    this._clientsgroupsservice.getClienteGrupo(id).subscribe((resp)=>{
      console.log("datos clientes grupo");
      console.log(resp);
      this.datosCliente = resp;
      console.log(this.datosCliente);
      this.form.get('nombre_grupo').setValue(this.datosCliente.nombre);
    });
  }
  selectClientsSend(client)
  {
    const elem = this.clientesTemp.find(cSelect => { return cSelect.id == client.id });
    if (!elem) {
      this.clientesTemp.push(client);
    } else {
      const index = this.clientesTemp.indexOf(elem);
      this.clientesTemp.splice(index, 1)
    }
  }

  selectClient(client) {
    let encontrado = -1;
    let tempClientesSelects = this.clientesSelectsTemp;
    if (this.clientesSelectsTemp.length > 0)
    {
      for(let i = 0; i < this.clientesSelectsTemp.length; i++)
      {
        const id = this.clientesSelectsTemp[i].id; 
        if (id === client.id || id == client.id)
        { 
          encontrado = i;
        }
      }
      if (encontrado !== -1)
      {
        tempClientesSelects.splice(encontrado, 1);
      }
      else {
        tempClientesSelects.push(client);
      }
    }
    else {
      tempClientesSelects.push(client);
    }
    this.clientesSelectsTemp = tempClientesSelects;
  }

  getClients()
  {
    this._clientsgroupsservice.getClientes().subscribe((resp)=>{
      this.clientes = resp;
      console.log("leidos: ");
      console.log(this.clientes);
    });
  }

  sendForm() {
    if (this.principal !== null)
    {
      
      let datos = { id: this.id_grupo, nombre: this.form.get('nombre_grupo').value };
      this._clientsgroupsservice.modifyClienteGrupo(datos).subscribe(resp=>{
        console.log("guarda cambios");
        console.log(resp);
        if (resp.status === 202)
        {
          // eliminar todas las relaciones
          console.log("eliminar todas las relaciones: ");
          const observables = this.id_relacion_clientes.map(id => this._clientsgroupsservice.deleteRelationClienteGrupo(id));
          forkJoin(observables).subscribe(
            () => {            
              
              for(let clienteAgregado of this.clientesAgregados)
              {
                let datos2 = {};

                if (clienteAgregado.id == this.principal)
                {
                  datos2 = {
                    clientes_principal: true,
                    cliente: clienteAgregado.id,
                    cliente_grupo: this.id_grupo
                  }
                  
                }
                else {
                  datos2 = {
                    clientes_principal: false,
                    cliente: clienteAgregado.id,
                    cliente_grupo: this.id_grupo
                  }
                  
                }
                // aqui llamo la otra funcion para asignarle clientes
                
                this._clientsgroupsservice.createRelationClienteGrupo(datos2).subscribe(resp2=>{
                  console.log(resp2);
                  console.log("respuesta");
                  
                });
                
              
              }
              console.log("guardar cambios");
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
                  ['clientes-grupos/detail', this.id_grupo]
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
            },
            error => {
              console.error('Ocurrió un error:', error);
            }
          );
          if (this.id_relacion_clientes.length === 0)
          {
            console.log("crea las relaciones " + this.clientesAgregados.length);

            //for(let clienteAgregado of this.clientesAgregados)
            let observables2 = this.clientesAgregados.map((clienteAgregado) => {
              
              let datos2 = {};

              if (clienteAgregado.id == this.principal)
              {
                datos2 = {
                  clientes_principal: true,
                  cliente: clienteAgregado.id,
                  cliente_grupo: this.id_grupo
                }
                console.log("principal");
              }
              else {
                datos2 = {
                  clientes_principal: false,
                  cliente: clienteAgregado.id,
                  cliente_grupo: this.id_grupo
                }
                console.log("no principal");
              }

              return this._clientsgroupsservice.createRelationClienteGrupo(datos2);/*.subscribe(resp2=>{
                console.log(resp2);
                
                if (resp2.status == 201) {
                  
                } else {
                  this.errorGuardando = "Se ha producido un error inesperado. Talvés no se han podido guardar todos los clientes.";
                }
                return resp2;
              });
              */
            });
            forkJoin(observables2).subscribe(
              () => {
                swal.fire({
                  title: 'Confirmación.',
                  text: "Actualizado con exito",
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                  icon: 'success'
                });
                this.router.navigate(
                  ['clientes-grupos/detail', this.id_grupo]
                );
                /*
                if (this.errorGuardando === '') {
                  swal.fire({
                    title: 'Confirmación.',
                    text: "resp.message",
                    buttonsStyling: false,
                    customClass: {
                      confirmButton: "btn btn-success",
                    },
                    icon: 'success'
                  });
                  this.router.navigate(
                    ['clientes-grupos/detail', this.id_grupo]
                  );
                } else {
                  swal.fire({
                    title: 'Error.',
                    text: this.errorGuardando,
                    buttonsStyling: false,
                    customClass: {
                      confirmButton: "btn btn-success",
                    },
                    icon: 'error'
                  });
                }
                */
              },
              error => {
                console.error('Ocurrió un error:', error);
              });
          }
        }
      });
    }
    else {
      swal.fire({
        title: 'Error.',
        text: "Debe indicar un cliente principal",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success",
        },
        icon: 'error'
      });
    }
  }
  selectPrincipal(id)
  {
    this.principal = id;
  }
  clearForm() {
    this.form.reset();
    this.clientesSelects = [];
    this.clientesAgregados = [];
  }

  cancelModal() {

  }

  aceptModal()
  {
    //this.clientesAgregados = this.clientesTemp;
    for (let i = 0; i < this.clientesTemp.length; i++) {
      const id = this.clientesTemp[i].id;
      const existsInA = this.clientesAgregados.some(obj => obj.id === id);
      if (!existsInA) {
        this.clientesAgregados.push(this.clientesTemp[i]);
      }
    }
  }
  deleteCliente() { // clientesAgregados
    this.clientesAgregados = this.clientesAgregados.filter(cliente =>
      !this.clientesSelectsTemp.some(tempCliente => {
        if (tempCliente.id === cliente.id)
        {
          if (this.principal === cliente.id)
          {
            this.principal = null;
          }
          return tempCliente;
        }
      })
    );
  }

  selectAll(elementos)
  {
    //this.clientesSelects = elementos;
    this.clientesSelectsTemp = elementos;
  }
}
