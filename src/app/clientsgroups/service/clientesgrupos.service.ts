import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import * as FileSaver from "file-saver";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientesgruposService {

  token:string = 'Bearer ' + localStorage.getItem('token'); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJlbWVfbWFya2V0aW5nQG11c2ljYXIuY29tIiwidWlkIjoic00yMV8yMl9JMjYiLCJyb2wiOjEsImlhdCI6MTY5Mjc5ODQ4NywiZXhwIjoxNzI0MzU2MDg3fQ.IlFr36wBO768_nAHfYe6xQkzFXE53FSyvfW-tA7B33A`;
  url:string = 'http://208.76.84.103:3000/api/v1/';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });
  constructor(private http: HttpClient) { }

  getClientesgrupos() {
    return this.http.get<any[]>(`${this.url}clientes/clientes-grupos/all`, { headers: this.headers }).pipe(map(ClientsGroups => {
      return ClientsGroups.map((ClientGroup) => ({
        id: ClientGroup.id,
        nombre: ClientGroup.nombre
      }));
    }));
  }

  getClientes()
  {
    return this.http.get<any[]>(`${this.url}clientes/singrupo`, { headers: this.headers }).pipe(map(Clientes => {
      console.log("datos enteros:");
      console.log(Clientes);
      return Clientes.map((Client) => ({
        id: Client.id,
        razon_social: Client.razon_social,
        razon_comercial: Client.razon_comercial,
        nit: Client.nit,
        pais: Client.pais
      }));
    }));
  }

  getClienteGrupoById(id)
  {

  }
  getAllClientesGrupos()
  {
    
  }

  createClienteGrupo(datos)
  {
    return this.http.post<any>(`${this.url}clientes/clientes-grupos`, datos, { headers: this.headers });
  }
  modifyClienteGrupo(datos)
  {
    return this.http.patch<any>(`${this.url}clientes/clientes-grupos`, datos, { headers: this.headers });
  }
  createRelationClienteGrupo(datos)
  {
    return this.http.post<any>(`${this.url}clientes/relations/clientes-and-clientes-grupo`, datos, { headers: this.headers });
  }
  createRelationClienteGrupoObs(datos):Observable<any>
  {
    return this.http.post<any>(`${this.url}clientes/relations/clientes-and-clientes-grupo`, datos, { headers: this.headers });
  }
  deleteRelationClienteGrupo(id)
  {
    return this.http.delete<any>(`${this.url}clientes/relations/clientes-and-clientes-grupo/${id}`, { headers: this.headers });
  }
  getRelationClienteGrupo(id)
  {
    return this.http.get<any>(`${this.url}clientes/relations/clientes-and-clientes-grupo/xgrupo/${id}`, { headers: this.headers });
  }
  getClienteGrupo(id)
  {
    return this.http.get<any>(`${this.url}clientes/clientes-grupos/${id}`, { headers: this.headers });
  }
  // clientes/relations/clientes-and-clientes-grupo/xgrupo/{id}
  getClientesGrupos(id)
  {
    //return this.http.get<any[]>(`${this.url}clientes/relations/clientes-and-clientes-grupo/${id}`, { headers: this.headers });
    
    return this.http.get<any[]>(`${this.url}clientes/relations/clientes-and-clientes-grupo/xgrupo/${id}`, { headers: this.headers }).pipe(map(Clientes => {
      if (Clientes.length > 0)
      {
        return Clientes.map((Client) => ({
          id: Client.cliente.id,
          razon_social: Client.cliente.razon_social,
          razon_comercial: Client.cliente.razon_comercial,
          nit: Client.cliente.nit,
          pais: Client.cliente.paises.nombre,
          cliente_principal: Client.clientes_principal,
          id_relacion: Client.id
        }));
      }
      else {
        return [];
      }
    }));
  }
  deleteClientGroup(id:number):any
  {    
    return this.http.delete<any>(`${this.url}clientes/clientes-grupos/${id}`, { headers: this.headers }); 
  }

  exportExcel(ClientesGrupos: any[]) {
    const datos = ClientesGrupos.map(clientegrupo => {
      return {
        id: clientegrupo.id,
        nombre: clientegrupo.nombre,
      }
    });
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(datos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook,
        {
          bookType: 'xlsx',
          type: 'array'
        });
      this.saveAsExcelFile(excelBuffer, 'clientes_grupos');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportPdf(clientesgrupos: any[], cols: any[]) {
    const datos = clientesgrupos.map(clientegrupo => {
      return {
        id: clientegrupo.id,
        nombre: clientegrupo.nombre,
      }
    });
    const exportColumns = cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    const doc = new jsPDF('p', 'pt');
    autoTable(doc, {
      columns: exportColumns,
      body: datos,
      didDrawPage: (dataArg) => {
        doc.text('Lista Grupos Clientes', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`grupos_clientes.pdf`);
  }
}
