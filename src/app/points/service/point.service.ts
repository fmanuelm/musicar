import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import * as FileSaver from "file-saver";
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { BranchFacility } from 'src/app/branch-facility/interfaces/Branch-facility.interface';


@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });


  getPoints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}puntos/all`, { headers: this.headers }).pipe(map(points => {
      return points.map(p => ({
        ...p,
        // pais: p.contratos[0].cliente.paises.nombre,
        pais: p.contratos[0].cliente.paises ? p.contratos[0].cliente.paises.nombre : '',
        cliente: p.contratos[0].cliente.razon_social ? p.contratos[0].cliente.razon_social : '',
        sucursal: p.contratos[0].contrato.sucursal_instalacion ? p.contratos[0].contrato.sucursal_instalacion.nombre : ''

      }));
    }));
  }

  getPointById(idPoint): Observable<any> {
    return this.http.get<any>(`${this.url}puntos/${idPoint}`, { headers: this.headers })
  }

  deletePoint(idPoint): Observable<any> {
    return this.http.delete<any>(`${this.url}puntos/${idPoint}`, { headers: this.headers })
  }

  storePoint(request): Observable<any> {
    return this.http.post<any>(`${this.url}puntos`, request, { headers: this.headers });
  }

  updatePoint(request): Observable<any> {
    return this.http.patch<any>(`${this.url}puntos`, request, { headers: this.headers });
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}seed/paises/all`, { headers: this.headers });
  }

  getClientsByCountry(idCountry) {
    return this.http.get<Client[]>(`${this.url}clientes/xpais/${idCountry}`, { headers: this.headers }).pipe(map(clients => {
      return clients.map((client: Client) => ({
        ...client,
      }));
    }));
  }

  getBranchFacilityByClient(idClient): Observable<any> {
    return this.http.get<any>(`${this.url}ubicacion/sucursal-instalacion/xcliente/${idClient}`, { headers: this.headers });
  }



  getContrats(idBranchFacility): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}contratos/xsucursal/${idBranchFacility}`, { headers: this.headers }).pipe(map(contracts => {
      return contracts.map(contract => ({
        ...contract,
        estado: contract.contratos_estado.referencia,
        sucursal: contract.sucursal_instalacion.nombre,
        cliente: contract.sucursal_instalacion.clientes.razon_social,
        sublinea: contract.negocio_sublineas.codigo_sublineas
      }));
    }));
  }




  exportPdf(pints: any[], cols: any[]) {
    const datos = pints.map(p => {
      return {
        ...p,
        pais: p.contratos[0].cliente.paises ? p.contratos[0].cliente.paises.nombre : '',
        cliente: p.contratos[0].cliente.razon_social ? p.contratos[0].cliente.razon_social : '',
        sucursal: p.contratos[0].contrato.sucursal_instalacion ? p.contratos[0].contrato.sucursal_instalacion.nombre : ''
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
        doc.text('puntos', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`puntos.pdf`);
  }


  exportExcel(points: any[]) {
    const datos = points.map(p => {
      return {
        id: p.id,
        pais: p.contratos[0].cliente.paises ? p.contratos[0].cliente.paises.nombre : '',
        cliente: p.contratos[0].cliente.razon_social ? p.contratos[0].cliente.razon_social : '',
        sucursal: p.contratos[0].contrato.sucursal_instalacion ? p.contratos[0].contrato.sucursal_instalacion.nombre : ''
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
      this.saveAsExcelFile(excelBuffer, 'puntos');
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
