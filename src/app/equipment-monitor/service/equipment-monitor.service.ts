import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import * as FileSaver from "file-saver";


@Injectable({
  providedIn: 'root'
})
export class EquipmentMonitorService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });


  getEquimentMonitor(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}equipos/monitor-equipo-inventario/all`, { headers: this.headers }).pipe(map(ems => {
      return ems.map(em => ({
        ...em,
        pais: em.equipo_inventario.puntos.contratos[0].cliente.paises.nombre,
        cliente: em.equipo_inventario.puntos.contratos[0].cliente.razon_social,
        punto: em.equipo_inventario.puntos.id,
      }))
    }))
  }

  getEquimentMonitorById(id): Observable<any> {
    return this.http.get<any>(`${this.url}equipos/monitor-equipo-inventario/${id}`, { headers: this.headers })
  }


  exportPdf(equipmentsMonitors: any[], cols: any[]) {
    const datos = equipmentsMonitors.map(em => {
      return {
        ...em,
        pais: em.equipo_inventario.puntos.contratos[0].cliente.paises.nombre,
        cliente: em.equipo_inventario.puntos.contratos[0].cliente.razon_social,
        punto: em.equipo_inventario.puntos.id,
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
        doc.text('MonitoresEquipos', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`MonitoresEquipos.pdf`);
  }


  exportExcel(equipmentsMonitors: any[]) {
    const datos = equipmentsMonitors.map(em => {
      return {
        pais: em.equipo_inventario.puntos.contratos[0].cliente.paises.nombre,
        cliente: em.equipo_inventario.puntos.contratos[0].cliente.razon_social,
        punto: em.equipo_inventario.puntos.id,
        estado_conexion: em.flag_estado_conexion_red,
        ultima_conexion: em.fecha_estado_conexion_red,
        tiempo: em.tiempo_ultima_conexion,
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
      this.saveAsExcelFile(excelBuffer, 'MonitorEquipos');
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
