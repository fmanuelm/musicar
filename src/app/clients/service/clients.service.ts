import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Client } from '../interfaces/Client.interface';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
  }

  private url: string = 'https://musicarapi.onrender.com/api/v1/clientes';
  private token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });

  getClients() {
    return this.http.get<Client[]>(`${this.url}/all`, { headers: this.headers }).pipe(map(clients => {
      return clients.map((client: Client) => ({       
        observaciones: client.observaciones,
        paises: client.paises,
        paises_extra: client.paises_extra,
        subgrupo_economico: client.subgrupo_economico,
        usuario_comercial: client.usuario_comercial,
        datos_contacto:client.datos_contacto,
        horarios: client.horarios,
        razon_social: client.razon_social,
        razon_comercial: client.razon_comercial,
        nit: client.nit,
        tipo_cliente: client.tipo_cliente,
        pais_nombre: client.paises.nombre
      }));
    }));
  }
}
