import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }
  private stepSubject: BehaviorSubject<string> = new BehaviorSubject<string>('1');
  step$ = this.stepSubject.asObservable();
  private url: string = 'http://208.76.84.103:3000/api/v1/';
  private token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJlbWVfbWFya2V0aW5nQG11c2ljYXIuY29tIiwidWlkIjoic00yMV8yMl9JMjYiLCJyb2wiOjEsImlhdCI6MTY4NTExMTI5OSwiZXhwIjoxNzE2NjY4ODk5fQ.CpkXGiNHkRTvJnS8RmFtMCcYFMRLvDXpKFlYyWZ_SCk';
  private headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });
  messageCategories: any[] = [];
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
}
