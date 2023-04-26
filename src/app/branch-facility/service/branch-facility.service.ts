import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import * as FileSaver from "file-saver";
import { Country } from 'src/app/clients/interfaces/Country.interface';
import { Client } from 'src/app/clients/interfaces/Client.interface';
import { BranchFacility, Center, Regional } from '../interfaces/Branch-facility.interface';


@Injectable({
  providedIn: 'root'
})
export class BranchFacilityService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });


  getBranchsFacility(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}ubicacion/sucursal-instalacion/all`, { headers: this.headers }).pipe(map(bfs => {
      return bfs.map(bf => ({
        ...bf,
        cliente: bf.clientes.razon_social,
        pais: bf.regionales_ciudades.regionales.paises.nombre
      }));
    }));
  }

  deleteBranchFacility(idBranchFacility): Observable<any> {
    return this.http.delete<any>(`${this.url}ubicacion/sucursal-instalacion/${idBranchFacility}`, { headers: this.headers })
  }

  getBranchsFacilityById(idBranchFacility): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}ubicacion/sucursal-instalacion/${idBranchFacility}`, { headers: this.headers })
  }

  storeBranchFacility(branchFacility: BranchFacility): any {
    return this.http.post<any>(`${this.url}ubicacion/sucursal-instalacion`, branchFacility, { headers: this.headers });
  }

  updateBranchFacility(branchFacility: BranchFacility): any {
    return this.http.patch<any>(`${this.url}ubicacion/sucursal-instalacion`, branchFacility, { headers: this.headers });
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}seed/paises/all`, { headers: this.headers });
  }

  getCenterSells(idCountry): Observable<any> {
    return this.http.get<any>(`${this.url}seed/centro-operaciones/vende/xpais/${idCountry}`, { headers: this.headers });
  }

  getCenterAttendants(idCountry): Observable<any> {
    return this.http.get<any>(`${this.url}seed/centro-operaciones/atiende/xpais/${idCountry}`, { headers: this.headers });
  }

  getRegionalsByCountry(idCountry): Observable<any> {
    return this.http.get<any>(`${this.url}seed/regionales/xpais/${idCountry}`, { headers: this.headers });
  }

  getCityByRegional(idRegional): Observable<any> {
    return this.http.get<any>(`${this.url}seed/regionales-ciudades/xregional/${idRegional}`, { headers: this.headers });
  }

  getClientsByCountry(idCountry) {
    return this.http.get<Client[]>(`${this.url}clientes/xpais/${idCountry}`, { headers: this.headers }).pipe(map(clients => {
      return clients.map((client: Client) => ({
        ...client,
      }));
    }));
  }




  exportPdf(branchFacility: any[], cols: any[]) {
    const datos = branchFacility.map(bf => {
      return {
        nombre: bf.nombre,
        alias: bf.alias,
        cliente: bf.cliente,
        pais: bf.pais,
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
        doc.text('sucursalInstalacion', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`sucursalInstalacion.pdf`);
  }


  exportExcel(branchFacility: any[]) {
    const datos = branchFacility.map(bf => {
      return {
        nombre: bf.nombre,
        alias: bf.alias,
        pais: bf.pais,
        cliente: bf.cliente,
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
      this.saveAsExcelFile(excelBuffer, 'sucursalInstalacion');
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
