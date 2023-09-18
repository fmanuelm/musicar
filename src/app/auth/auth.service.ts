import { Injectable, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavItemType } from '../md/md.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private url: string = 'http://208.76.84.103:3000/api/v1/';
  token = null;
  headers: HttpHeaders;

  login(correo: string, password: string)
  {
    let data = {
      "correo":correo,
      "password":password
    };

    let resp = this.http.post<any>(`${this.url}auth/login`,data);
    resp.subscribe((response)=>{
      if (response.status === 200)
      {
        
      }
    });
    
    return resp;
  }

  getSectorEconomico() {
    return this.http.get<any[]>(`${this.url}seed/sector-economico/all`);
  }
  getPaises() {
    return this.http.get<any[]>(`${this.url}seed/paises/all`);
  }

  getRegiones(id: number) {
    return this.http.get<any[]>(`${this.url}seed/regionales/xpais/${id}`);
  }

  getCiudades(id:number) {
    return this.http.get<any[]>(`${this.url}seed/regionales-ciudades/xregional/${id}`);
  }

  getNegocioLinea()
  {
    return this.http.get<any[]>(`${this.url}seed/negocio-lineas/all`);
  }

  isAuthenticated(): Observable<boolean> {
    this.token = localStorage.getItem("token");
    if (this.token !== null && this.token !== undefined)
    {
      this.headers = new HttpHeaders({ 'x-api-key': this.token });
      
      return this.http.get<any>(`${this.url}auth/validar`, { headers: this.headers })
        .pipe(map(resp => resp.status === true));
    }
    else 
    {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }

  register (
    nombre,
    apellido,
    correo,
    telefono, 
    usuario,
    password,
    razon_social,
    nit,
    pais,
    subgrupo_economico,
    negocio_sublinea,
    regionales_ciudades
    )
  {
    let data = {
      "nombre": nombre,
      "apellido": apellido,
      "correo": correo,
      "telefono": telefono,
      "usuario": usuario,
      "password": password,
      "razon_social": razon_social,
      "nit": nit,
      "paises": pais,
      "subgrupo_economico": subgrupo_economico,
      "negocio_sublinea": negocio_sublinea,
      "demostraciones_tiempo_dia": 3,
      "regionales_ciudades": regionales_ciudades
    };

    let resp = this.http.post<any>(`${this.url}usuarios/demostracion`,data);
    /*
    resp.subscribe((response)=>{
      if (response.status === 200)
      {
        
      }
    });
    */
    return resp;
  }
}
