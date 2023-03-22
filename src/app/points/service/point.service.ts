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
export class PointService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });


  getPoints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}puntos/all`, { headers: this.headers });
  }




  exportPdf(branchFacility: any[], cols: any[]) {
    const datos = branchFacility.map(cliente => {
      return {
        razon_social: cliente.razon_social,
        razon_comercial: cliente.razon_comercial,
        nit: cliente.nit,
        tipo_cliente: cliente.tipo_cliente,
        pais: cliente.pais_nombre,
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


  exportExcel(clients: any[]) {
    const datos = clients.map(cliente => {
      return {
        razon_social: cliente.razon_social,
        razon_comercial: cliente.razon_comercial,
        nit: cliente.nit,
        tipo_cliente: cliente.tipo_cliente,
        pais: cliente.pais_nombre,
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
