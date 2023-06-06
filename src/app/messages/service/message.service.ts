import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Observable, BehaviorSubject, identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }
  private stepSubject: BehaviorSubject<string> = new BehaviorSubject<string>('1');
  step$ = this.stepSubject.asObservable();

  private catMessageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  msg$ = this.catMessageSubject.asObservable();

  private categorySubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  cat$ = this.categorySubject.asObservable();

  private moduleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  mod$ = this.moduleSubject.asObservable();

  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJlbWVfbWFya2V0aW5nQG11c2ljYXIuY29tIiwidWlkIjoic00yMV8yMl9JMjYiLCJyb2wiOjEsImlhdCI6MTY4NTExMTI5OSwiZXhwIjoxNzE2NjY4ODk5fQ.CpkXGiNHkRTvJnS8RmFtMCcYFMRLvDXpKFlYyWZ_SCk';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });
  messageCategories: any[] = [];
  messagesPresaved: any[] = [];
  points: any[] = [];
  sucurals: any[] = [];
  getMessagesOutlineType() {
    
    return this.http.get<any[]>(`${this.url}seed/mensajes-esquema-tipo/all`, { headers: this.headers }).pipe(map(MessagesOutline => {
      
      return MessagesOutline.map((MessageOutline) => ({
        ...MessageOutline
      }));
    }));
  }

  getMessagesPresavedCategories()
  {
    return this.http.get<any[]>(`${this.url}mensajes/mensajes-pregrabados-categorias/all`, { headers: this.headers }).pipe(map(MessagesPresavedCategories => {
      
      this.messageCategories = MessagesPresavedCategories;
      return MessagesPresavedCategories.map((MessagePresavedCategories) => ({
        ...MessagePresavedCategories
      }));
    }));
  }

  getMensajesPregrabados(id: number) {
    return this.http.get<any[]>(`${this.url}mensajes/relations/mensajes-and-pregrabados-categoria/xpregrabado-categoria/${id}`, { headers: this.headers }).pipe(map(MessagesPresaved => {
      
      this.messagesPresaved = MessagesPresaved;
      return MessagesPresaved.map((MessagePresaved) => ({
        ...MessagePresaved
      }));
    }));
  }
  getStep(): any { 
    return this.stepSubject.getValue();
  }

  setStep(valor:string):void {
    this.stepSubject.next(valor);
  }

  getCategoryName(id: number) {
    let categoriaEncontrada: string;
    
    
    for (const elemento of this.messageCategories) {
      if (elemento.id == id) {
        categoriaEncontrada = elemento.categoria;
        break;
      }      
    }
    
    return categoriaEncontrada;
  }
  setModule(mod: string)
  {
    this.moduleSubject.next(mod);
  }
  getModule()
  {
    return this.moduleSubject.getValue();
  }
  setSelectCategory(params:any) {
    const {id, title } = params;
    this.categorySubject.next({"id": id, "title": title});
  }
  getCategorySelect():any
  {
    return this.categorySubject.getValue();
  }

  setSelectMessage(id: number) {
    this.catMessageSubject.next(id);
  }
  getMessageSelect():any
  {
    return this.catMessageSubject.getValue();
  }
  getPoints() {
    let id = 1;
    return this.http.get<any[]>(`${this.url}puntos/xcliente/${id}`, { headers: this.headers }).pipe(map(Points => {
      
      this.points = Points;
      return Points.map((Point) => ({
        ...Point
      }));
    }));
  }
  getRegionals() {
    let id = 1;
    return this.http.get<any[]>(`${this.url}puntos/puntos-grupos/xcliente/${id}`, { headers: this.headers }).pipe(map(Sucursals => {
      
      this.sucurals = Sucursals;
      return Sucursals.map((Sucursal) => ({
        ...Sucursal
      }));
    }));
  }
}
