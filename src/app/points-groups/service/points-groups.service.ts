import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import * as FileSaver from "file-saver";
import { Country } from '../../clients/interfaces/Country.interface';
import { Client } from '../../clients/interfaces/Client.interface';


@Injectable({
  providedIn: 'root'
})
export class PointsGroupsService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer ' + localStorage.getItem('token'); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });


  getPointsGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}puntos/puntos-grupos/all`, { headers: this.headers }).pipe(map(points => {
      return points.map(point => ({
        ...point,
        clienteValue: point.clientes.razon_social,
        paisValue: point.clientes.paises.nombre,
        nitValue: point.clientes.nit,
      }))
    }))
  }


  getPointsGroupsById(id): Observable<any> {
    return this.http.get<any>(`${this.url}puntos/puntos-grupos/${id}`, { headers: this.headers })
  }

  deletePointsGroupsById(id): Observable<any> {
    return this.http.delete<any>(`${this.url}puntos/puntos-grupos/${id}`, { headers: this.headers })
  }

  storePointsGroups(request): Observable<any> {
    return this.http.post<any>(`${this.url}puntos/puntos-grupos`, request, { headers: this.headers })
  }

  storeOnePointInGroup(request): Observable<any> {
    return this.http.post<any>(`${this.url}puntos/relations/puntos-and-puntos-grupos`, request, { headers: this.headers })
  }

  deleteOnePointIngroup(id): Observable<any> {
    return this.http.delete<any>(`${this.url}puntos/relations/puntos-and-puntos-grupos/${id}`, { headers: this.headers })
  }

  updatePointsGroups(request): Observable<any> {
    return this.http.patch<any>(`${this.url}puntos/puntos-grupos`, request, { headers: this.headers })
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}seed/paises/all`, { headers: this.headers });
  }

  getPointsContractByClient(idClient): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}puntos/xcliente/${idClient}`, { headers: this.headers }).pipe(map(objs => {
      return objs.map(obj => ({
        // punto: obj.puntos.id,
        // id: obj.id,
        // contrato: obj.contratos.codigo_contrato,
        // sucursal: obj.contratos.sucursal_instalacion.nombre,
        // sublinea: obj.contratos.negocio_sublineas.codigo_sublineas
        // ...obj,
        id: obj.id,
        sucursal: obj.contratos[0].contrato.sucursal_instalacion.nombre,
        contrato: obj.contratos[0].contrato.codigo_contrato,
        sublinea: obj.contratos[0].contrato.negocio_sublineas.codigo_sublineas,
      }))
    }));
  }

  getClientsByCountry(idCountry) {
    return this.http.get<Client[]>(`${this.url}clientes/xpais/${idCountry}`, { headers: this.headers }).pipe(map(clients => {
      return clients.map((client: Client) => ({
        ...client,
      }));
    }));
  }




  exportPdf(pointsGroups: any[], cols: any[]) {

    const datos = pointsGroups.map(point => {
      return {
        nombre: point.nombre,
        clienteValue: point.clientes.razon_social,
        paisValue: point.clientes.paises.nombre,
        nitValue: point.clientes.nit,
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
        doc.text('gruposPuntos', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`gruposPuntos.pdf`);
  }


  exportExcel(pointsGroups: any[]) {
    const datos = pointsGroups.map(point => {
      return {
        nombre: point.nombre,
        pais: point.clientes.paises.nombre,
        nit: point.clientes.nit,
        cliente: point.clientes.razon_social,
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
      this.saveAsExcelFile(excelBuffer, 'gruposPuntos');
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
