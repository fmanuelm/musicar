import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesgruposService } from '../service/clientesgrupos.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  public clientesAgregados = [];
  public clientesAgregadosSeleccionados:[] = [];
  public clientes = [];
  public cols = [
    { field: 'nombre', header: 'País' },
  ];
  public clientesTemp = [];
  public principalSelected : number;
  public clientesSelects : any = [];
  public clientesSelectsTemp : any[] = [];
  public principal : number = null;
  constructor(private _formBuilder: FormBuilder, private _clientsgroupsservice: ClientesgruposService, private router: Router) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nombre_grupo: [null, [Validators.required]],
    });
    this.clientesAgregados = [
      
    ];
    this.getClients();
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
  selectAllSend(clientes)
  {
    
    for(let client of clientes)
    {
     
      const elem = this.clientesTemp.find(cSelect => { return cSelect.id == client.id });
      if (!elem) {
        this.clientesTemp.push(client);
      } else {
        const index = this.clientesTemp.indexOf(elem);
        this.clientesTemp.splice(index, 1)
      }
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

  selectPrincipal(id)
  {
    this.principal = id;
  }

  getClients()
  {
    this._clientsgroupsservice.getClientes().subscribe((resp)=>{
      this.clientes = resp;
      console.log("leidos: ");
      console.log(this.clientes);
    });
  }
  clearForm() {
    this.form.reset();
    this.clientesSelects = [];
    this.clientesAgregados = [];
    this.principal = null;
  }
  sendForm() {
    let datos = {nombre:this.form.get('nombre_grupo').value};
    console.log(datos);
  
    /*
    for(let clienteAgregado of this.clientesAgregados)
    {
      console.log(clienteAgregado);
    }
    */
    if (this.principal !== null)
    {
      this._clientsgroupsservice.createClienteGrupo(datos).subscribe(resp=>{
        console.log(resp);
        if (resp.status === 201)
        {
          let id_grupo = resp.response;
          // leer todos los grupos
          for(let clienteAgregado of this.clientesAgregados)
          {
            let datos2 = {};

            if (clienteAgregado.id == this.principal)
            {
              datos2 = {
                clientes_principal: true,
                cliente: clienteAgregado.id,
                cliente_grupo: id_grupo
              }
              
            }
            else {
              datos2 = {
                clientes_principal: false,
                cliente: clienteAgregado.id,
                cliente_grupo: id_grupo
              }
              
            }
            // aqui llamo la otra funcion para asignarle clientes
            
            this._clientsgroupsservice.createRelationClienteGrupo(datos2).subscribe(resp2=>{
              console.log(resp2);
              
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
                  ['clientes-grupos/list']
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
