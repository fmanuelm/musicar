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
export class ContratsService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer ' + localStorage.getItem('token'); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });


  getContrats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}contratos/all`, { headers: this.headers }).pipe(map(contracts => {
      return contracts.map(contract => ({
        ...contract,
        estado: contract.contratos_estado.referencia,
        sucursal: contract.sucursal_instalacion.nombre,
        cliente: contract.sucursal_instalacion.clientes.razon_social,
        sublinea: contract.negocio_sublineas.codigo_sublineas
      }));
    }));
  }

  getContratById(idContract): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}contratos/${idContract}`, { headers: this.headers })
  }

  deleteContratById(idContract): Observable<any> {
    return this.http.delete<any>(`${this.url}contratos/${idContract}`, { headers: this.headers })
  }

  storeContrat(request): Observable<any> {
    return this.http.post<any>(`${this.url}contratos`, request, { headers: this.headers });
  }

  updateContract(request): Observable<any> {
    return this.http.patch<any>(`${this.url}contratos`, request, { headers: this.headers });
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}seed/paises/all`, { headers: this.headers });
  }

  getBranchFacilityByClient(idClient): Observable<any> {
    return this.http.get<any>(`${this.url}ubicacion/sucursal-instalacion/xcliente/${idClient}`, { headers: this.headers });
  }

  getSublines(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/negocio-sublineas/all`, { headers: this.headers });
  }

  getContractStatus(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/contratos-estado/all`, { headers: this.headers });
  }

  getClientsByCountry(idCountry) {
    return this.http.get<Client[]>(`${this.url}clientes/xpais/${idCountry}`, { headers: this.headers }).pipe(map(clients => {
      return clients.map((client: Client) => ({
        ...client,
      }));
    }));
  }


  exportPdf(contrats: any[], cols: any[]) {
    const datos = contrats.map(contract => {
      return {
        codigo_contrato: contract.codigo_contrato,
        estado: contract.contratos_estado.referencia,
        sucursal: contract.sucursal_instalacion.nombre,
        cliente: contract.sucursal_instalacion.clientes.razon_social,
        sublinea: contract.negocio_sublineas.codigo_sublineas
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
        doc.text('contratos', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`contratos.pdf`);
  }


  exportExcel(contrats: any[]) {
    const datos = contrats.map(contract => {
      return {
        codigo_contrato: contract.codigo_contrato,
        estado: contract.contratos_estado.referencia,
        cliente: contract.sucursal_instalacion.clientes.razon_social,
        sucursal: contract.sucursal_instalacion.nombre,
        sublinea: contract.negocio_sublineas.codigo_sublineas
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
      this.saveAsExcelFile(excelBuffer, 'contratos');
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
