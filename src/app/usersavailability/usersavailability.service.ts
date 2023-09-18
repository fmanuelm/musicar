import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators'
import { Observable, from } from 'rxjs';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import * as FileSaver from "file-saver";
//import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UsersavailabilityService {
  token:string = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJlbWVfbWFya2V0aW5nQG11c2ljYXIuY29tIiwidWlkIjoic00yMV8yMl9JMjYiLCJyb2wiOjEsImlhdCI6MTY5Mjc5ODQ4NywiZXhwIjoxNzI0MzU2MDg3fQ.IlFr36wBO768_nAHfYe6xQkzFXE53FSyvfW-tA7B33A`;
  url:string = 'http://208.76.84.103:3000/api/v1/';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });
  allUsuarios:any[]=[];
  constructor(private http: HttpClient) { }

  getUsuariosDisponibilidad(): Observable<any[]> {
    const id_user = localStorage.getItem("id");
    
    return from(this.getAllUsuarios()).pipe(
      switchMap(() => {
        console.log(this.allUsuarios);
        return this.getClienteId(id_user).pipe(
          switchMap(resp => {
            const id_disponibilidad = resp[0].usuario.usuarios_disponibilidad.id;
            //console.log(this.allUsuarios);
            return this.http.get<any[]>(`${this.url}usuarios/xdisponibilidad/${id_disponibilidad}`, { headers: this.headers }).pipe(map(Disponibilidades => {
              console.log(Disponibilidades);
              return Disponibilidades.map((Disponibilidad)=>({
                id: Disponibilidad.id,
                nombres: Disponibilidad.nombre,
                apellidos: Disponibilidad.apellido,
                tipo_usuario: Disponibilidad.usuarios_tipo.tipo_usuario,
                disponibilidad: Disponibilidad.usuarios_disponibilidad.estado_usuario,
                pais: Disponibilidad.centro_operacion_atiende.paises.nombre,
                cliente: this.getNit(Disponibilidad.id)
              }));
            }));
          })
        );
      })
    );
  }
  
  getNit(id)
  {
    for(let elemento of this.allUsuarios)
    {
      if (elemento.id === id)
      {
        return elemento.cliente.nit;
      }
    }
    return null;
  }
  
  getAllUsuarios() {
    return new Promise<void>((resolve, reject) => {
      this.http.get<any[]>(`${this.url}usuarios/relations/usuarios-and-clientes/all`, { headers: this.headers })
        .subscribe(
          resp => {
            this.allUsuarios = resp;
            resolve(); 
          },
          error => {
            reject(error); 
          }
        );
    });
  }
  
  getUsuarioDisponibilidad()
  {
    const id_user = localStorage.getItem("id");
    
  }
  getClienteId(id_user)
  {
    return this.http.get<any>(`${this.url}usuarios/relations/usuarios-and-clientes/xusuario/${id_user}`, { headers: this.headers });
  }
  getUsuariosById(): Observable<any[]> {
    const id_user = localStorage.getItem("id");
    console.log(id_user);
    return this.getClienteId(id_user).pipe(
      switchMap(resp => {
        const id_client = resp[0].cliente.id;
        return this.http.get<any[]>(`${this.url}usuarios/relations/usuarios-and-clientes/xcliente/${id_client}`, { headers: this.headers }).pipe(map(Clientes=>{
          console.log(Clientes[10]);
          return Clientes.map((Cliente)=>({
            id: Cliente.usuario.id,
            nombres: Cliente.usuario.nombre,
            apellidos: Cliente.usuario.apellido,
            tipo_usuario: Cliente.usuario.usuarios_tipo.tipo_usuario,
            disponibilidad: Cliente.usuario.usuarios_disponibilidad.estado_usuario
          }));
        }));
      })
    );
  }

  createDisponibilidad(datos)
  {
    return this.http.post<any>(`${this.url}usuarios/usuarios-horarios-disponibilidad`,datos,{ headers: this.headers });
  }
  modificarDisponibilidad(datos)
  {
    return this.http.patch<any>(`${this.url}usuarios/usuarios-horarios-disponibilidad`,datos,{ headers: this.headers });
  }
  createFechaNoDisponible(datos)
  {
    return this.http.post<any>(`${this.url}usuarios/usuarios-no-disponibles`, datos, { headers: this.headers });
  }
  modificarFechaNoDisponible(datos)
  {
    return this.http.patch<any>(`${this.url}usuarios/usuarios-no-disponibles`, datos,{ headers: this.headers });
  }
  getUsuario(id)
  {
    return this.http.get<any>(`${this.url}usuarios/${id}`, { headers: this.headers });
  }
  modificarUsuario(datos)
  {
    return this.http.patch<any>(`${this.url}usuarios`, datos, { headers: this.headers });
  }
  getUsuarioHorarios(id)
  {
    return this.http.get<any[]>(`${this.url}usuarios/usuarios-horarios-disponibilidad/xusuario/${id}`, { headers: this.headers });
  }
  getUsuarioHorariosNoDisponible(id):any
  {
    return this.http.get<any[]>(`${this.url}usuarios/usuarios-no-disponibles/xusuario/${id}`, { headers: this.headers });
  }
  deleteDisponibilidad(id)
  {
    return this.http.delete<any>(`${this.url}usuarios/usuarios-horarios-disponibilidad/${id}`, { headers: this.headers });
  }
  getDisponibilidadesAll()
  {
    return this.http.get<any[]>(`${this.url}seed/usuarios-disponibilidad/all`, { headers: this.headers });
  }

  exportExcel(usuarios: any[]) {
    const datos = usuarios.map(usuario => {
      return {
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        pais: usuario.pais,
        cliente: usuario.cliente,
        tipo_usuario: usuario.tipo_usuario,
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
      this.saveAsExcelFile(excelBuffer, 'usuarios_diponibilidad');
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

  exportPdf(usuarios: any[], cols: any[]) {
    const datos = usuarios.map(usuario => {
      return {
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        pais: usuario.pais,
        cliente: usuario.cliente,
        tipo_usuario: usuario.tipo_usuario,
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
        doc.text('Disponibilidad Usuarios', dataArg.settings.margin.left, datos.length);
      }
    })

    doc.save(`usuarios_diponibilidad.pdf`);
  }
}


