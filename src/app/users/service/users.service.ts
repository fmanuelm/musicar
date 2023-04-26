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
export class UsersService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}usuarios/all`, { headers: this.headers }).pipe(map(users => {
      return users.map(user => ({
        ...user,
        paisValue: user.centro_operacion_atiende.paises.nombre,
        tUsuarioValue: user.usuarios_tipo.tipo_usuario,
        // cliente: user.clientes_asociados ? user.clientes_asociados[0].cliente.razon_social : '-----',
      }))
    }))
  }

  getUserById(idUser): Observable<any> {
    return this.http.get<any>(`${this.url}usuarios/${idUser}`, { headers: this.headers });
  }
  

  deleteUser(idUser): Observable<any> {
    return this.http.delete<any>(`${this.url}usuarios/${idUser}`, { headers: this.headers });
  }

  storeUser(request): Observable<any> {
    return this.http.post<any>(`${this.url}usuarios`, request, { headers: this.headers });
  }

  updateUser(request): Observable<any> {
    return this.http.patch<any>(`${this.url}usuarios`, request, { headers: this.headers });
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

  getTypeUser(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/usuarios-tipo/all`, { headers: this.headers });
  }

  getAttedantUser(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/centro-operaciones/atiende/all`, { headers: this.headers });
  }

  getDisponibility(): Observable<any> {
    return this.http.get<any>(`${this.url}seed/usuarios-disponibilidad/all`, { headers: this.headers });
  }

  getPointsByClient(idClient): Observable<any> {
    return this.http.get<any>(`${this.url}puntos/xcliente/${idClient}`, { headers: this.headers });
  }

  getPointsGroupsByClient(idClient): Observable<any> {
    return this.http.get<any>(`${this.url}puntos/puntos-grupos/xcliente/${idClient}`, { headers: this.headers });
  }

  getRegionalByClient(idClient): Observable<any> {
    return this.http.get<any>(`${this.url}regionales/relations/regionales-and-clientes/xcliente/${idClient}`, { headers: this.headers });
  }

  exportPdf(users: any[], cols: any[]) {
    const datos = users.map(user => {
      return {
        ...user,
        paisValue: user.centro_operacion_atiende.paises.nombre,
        tUsuarioValue: user.usuarios_tipo.tipo_usuario,
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
        doc.text('usuarios', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`usuarios.pdf`);
  }


  exportExcel(users: any[]) {
    const datos = users.map(user => {
      return {
        // ...user,
        nombres: user.nombre,
        apellidos: user.apellido,
        pais: user.centro_operacion_atiende.paises.nombre,
        tipo_usuario: user.usuarios_tipo.tipo_usuario,
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
      this.saveAsExcelFile(excelBuffer, 'usuarios');
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
