import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Client } from '../interfaces/Client.interface';
import { Country } from '../interfaces/Country.interface';
import { TypeClient } from '../interfaces/TypeClient.interface';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import * as FileSaver from "file-saver";
import { EconomicSector } from '../interfaces/EconomicSector.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer ' + localStorage.getItem('token'); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });

  getClients() {
    return this.http.get<Client[]>(`${this.url}clientes/all`, { headers: this.headers }).pipe(map(clients => {
      return clients.map((client: Client) => ({
        ...client,
        pais: client.paises.nombre,
        tCliente: client.tipo_cliente.nombre
      }));
    }));
  }

  getContactsByClient(idClient) {
    return this.http.get<any>(`${this.url}clientes/relations/clientes-and-clientes-tipo-contacto/xcliente/${idClient}`, { headers: this.headers });
  }

  getCountriesByClient(idClient) {
    return this.http.get<any>(`${this.url}paises/relations/paises-and-clientes/xcliente/${idClient}`, { headers: this.headers });
  }

  getOpeningHoursByClient(idClient) {
    return this.http.get<any>(`${this.url}clientes/clientes-horarios-atencion/xcliente/${idClient}`, { headers: this.headers });
  }

  deleteClient(id) {
    return this.http.delete<any>(`${this.url}clientes/${id}`, { headers: this.headers });
  }

  getClienteById(id) {
    return this.http.get<Client>(`${this.url}clientes/${id}`, { headers: this.headers });
  }

  storeClient(client: Client) {
    return this.http.post<any>(`${this.url}clientes`, client, { headers: this.headers });
  }

  updateClient(client: Client) {
    return this.http.patch<any>(`${this.url}clientes`, client, { headers: this.headers });
  }

  getTypeClient(): Observable<TypeClient[]> {
    return this.http.get<TypeClient[]>(`${this.url}seed/tipo-cliente/all`, { headers: this.headers });
  }

  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}seed/paises/all`, { headers: this.headers });
  }

  getEconomicSector(): Observable<EconomicSector[]> {
    return this.http.get<EconomicSector[]>(`${this.url}seed/subgrupo-economico/all`, { headers: this.headers });
  }

  getComercialAttend(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}usuarios/usuarios-comercial/all`, { headers: this.headers });
  }

  getTypeContact(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}seed/clientes-tipo-contacto/all`, { headers: this.headers });
  }

  getClientGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}clientes/clientes-grupos/all`, { headers: this.headers });
  }



  exportPdf(clients: any[], cols: any[]) {
    const datos = clients.map(cliente => {
      return {
        razon_social: cliente.razon_social,
        razon_comercial: cliente.razon_comercial,
        nit: cliente.nit,
        tCliente: cliente.tCliente,
        pais: cliente.pais,
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
        doc.text('clientes', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`clientes.pdf`);
  }


  exportExcel(clients: any[]) {
    const datos = clients.map(cliente => {
      return {
        razon_social: cliente.razon_social,
        razon_comercial: cliente.razon_comercial,
        nit: cliente.nit,
        tipo_cliente: cliente.tipo_cliente ? cliente.tipo_cliente.nombre : '---',
        pais: cliente.paises.nombre,
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
      this.saveAsExcelFile(excelBuffer, 'clientes');
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
}
