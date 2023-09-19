import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import * as FileSaver from "file-saver";
import { Client } from 'src/app/clients/interfaces/Client.interface';



@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer ' + localStorage.get('token'); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });


  getEquipments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}equipos/equipo-inventario/all`, { headers: this.headers }).pipe(map(equipments => {
      return equipments.map(e => ({
        ...e,
        tEquipo: e.equipo_tipo.tipo_equipo,
        punto: e.puntos.id
      }));
    }));
  }

  getEquipmentById(idEquipment): Observable<any> {
    return this.http.get<any>(`${this.url}equipos/equipo-inventario/${idEquipment}`, { headers: this.headers })
  }


  getClientById(idEquipment): Observable<Client> {
    return this.http.get<Client>(`${this.url}clientes/${idEquipment}`, { headers: this.headers })
  }

  deleteEquipment(idEquipment): Observable<any> {
    return this.http.delete<any>(`${this.url}equipos/equipo-inventario/${idEquipment}`, { headers: this.headers })
  }

  storeEquipments(request): Observable<any> {
    return this.http.post<any>(`${this.url}equipos/equipo-inventario`, request, { headers: this.headers });
  }

  updateEquipments(request): Observable<any> {
    return this.http.patch<any>(`${this.url}equipos/equipo-inventario`, request, { headers: this.headers });
  }

  getClientsByCountry(idCountry): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.url}clientes/xpais/${idCountry}`, { headers: this.headers });
  }

  getBranchFacilityByClient(idClient): Observable<any> {
    return this.http.get<any>(`${this.url}ubicacion/sucursal-instalacion/xcliente/${idClient}`, { headers: this.headers });
  }

  getPointByBranchFacility(idClient): Observable<any> {
    return this.http.get<any>(`${this.url}puntos/xcliente/${idClient}`, { headers: this.headers });
  }

  getTypeEquipment(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/equipo-tipo/all`, { headers: this.headers });
  }

  getEquipmentState(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/equipo-estado-inventario/all`, { headers: this.headers });
  }

  getSystemState(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/equipo-estado-sistema/all`, { headers: this.headers });
  }

  getState(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/equipo-estado/all`, { headers: this.headers });
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/paises/all`, { headers: this.headers });
  }




  exportPdf(equipments: any[], cols: any[]) {
    const datos = equipments.map(e => {
      return {
        ...e,
        tEquipo: e.equipo_tipo.tipo_equipo,
        punto: e.puntos.id
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
        doc.text('equipos', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`equipos.pdf`);
  }


  exportExcel(equipments: any[]) {
    const datos = equipments.map(e => {
      return {
        nombre: e.nombre,
        equipo_placa: e.equipo_placa,
        MAC: e.MAC,
        tipo_equipo: e.equipo_tipo.tipo_equipo,
        punto: e.puntos.id
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
      this.saveAsExcelFile(excelBuffer, 'equipos');
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
