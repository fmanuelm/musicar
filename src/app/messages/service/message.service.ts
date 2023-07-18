import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators'
import { Observable, BehaviorSubject, identity, forkJoin } from 'rxjs';
import { Externo } from "../interfaces/externo";
interface Pauta {
  name: string;
  code: string;
}
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public datos: any = {
    mensaje_tipo_esquema: 1,
    referencia_mensaje: "",
    contenido_mensaje: "",
    file: "archivo",
    observaciones: "",
    fechas_programacion_mensaje: [],
    tipo_de_dias: 1,
    dias_asociados: [],
    horas_tocado_mensaje: [],
    hora_tocado_inicio: "",
    hora_tocado_fin: "",
    secuencia: 1,
    horas_pico: [],
    horas_no_pico: [],
    puntos_asociados: [],
    aprobar_mensaje: true,
    usuario: 1,
    clientes: 1,
    categoria_mensaje: 1,
    tipo_grabacion: 1,
    prioridad_grabacion: 1,
    locutor: 1,
    tipo_pregrabado: "",
    termina_cancion: false,
    };
   
  constructor(private http: HttpClient) { }
  private msgExternoSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.datos);
  msgext$ = this.msgExternoSubject.asObservable();
  
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
  boundary = this.generateBoundary();
  // 'Content-Type': `multipart/form-data; boundary=${this.boundary}`
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });
  
  messageCategories: any[] = [];
  messagesPresaved: any[] = [];
  audioMessages: any[] = [];
  points: any[] = [];
  sucurals: any[] = [];
  duration: number | null = null;
  horas: any[] = [];
  getMessagesOutlineType() {
    
    return this.http.get<any[]>(`${this.url}seed/mensajes-esquema-tipo/all`, { headers: this.headers }).pipe(map(MessagesOutline => {
      
      return MessagesOutline.map((MessageOutline) => ({
        ...MessageOutline
      }));
    }));
  }
  private generateBoundary(): string {
    let boundary = '';
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < 16; i++) {
      boundary += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
  
    return boundary;
  }
  setMsgExterno(value: any):void
  {
    const currValue = this.msgExternoSubject.getValue();
    const updateValue = { ...currValue, ...value };
    this.msgExternoSubject.next(updateValue);
    //console.log("nombre archivo: " + this.msgExternoSubject.getValue().archivo_adjuntado.name);
    console.log(this.msgExternoSubject.getValue());
  }

  storeMensaje() {
    const mensaje = this.msgExternoSubject.getValue();
    
    
    console.log(mensaje);
    //const boundary = this.generateBoundary();
    //this.headers.append('Content-Type', 'multipart/form-data');
    
    //this.headers.append('Content-Type', `multipart/form-data; boundary=${boundary}`);
    //const boundary = this.generateBoundary();
    //this.headers.append('Content-Type', `multipart/form-data; boundary=${boundary}`);
    
  
    let formData = new FormData();
    formData.append("mensaje_tipo_esquema", `${mensaje.mensaje_tipo_esquema}`);
    formData.append("referencia_mensaje", `${mensaje.referencia_mensaje}`);
    formData.append("contenido_mensaje", `${mensaje.contenido_mensaje}`);
    formData.append("observaciones", `${mensaje.observaciones}`);
    
    formData.append("fechas_programacion_mensaje", JSON.stringify(mensaje.fechas_programacion_mensaje));
    
    if (mensaje.mensaje_tipo_esquema == 1)
    {
      formData.append("horas_tocado_mensaje", JSON.stringify(mensaje.horas_tocado_mensaje));
      console.log("guardando horas fijas");
    }
    if (mensaje.mensaje_tipo_esquema == 2)
    {
      formData.append("hora_tocado_inicio", `${mensaje.hora_tocado_inicio}`);
      formData.append("hora_tocado_fin", `${mensaje.hora_tocado_fin}`);
      formData.append("secuencia", `${mensaje.secuencia}`);
      console.log("guardando secuencia");
    }
    if (mensaje.mensaje_tipo_esquema == 3)
    {
      formData.append("horas_pico", JSON.stringify(mensaje.horas_pico));
      formData.append("horas_no_pico", JSON.stringify(mensaje.horas_no_pico));
      console.log("guardando locutor");
    }
    
    formData.append("tipo_de_dias", `${mensaje.tipo_de_dias}`);
    
    formData.append("puntos_asociados", JSON.stringify(mensaje.puntos_asociados));
    
    formData.append("aprobar_mensaje", `${mensaje.aprobar_mensaje}`);
    
    formData.append("usuario", `${mensaje.usuario}`);
    
    formData.append("clientes", `${mensaje.clientes}`);
    
    formData.append("categoria_mensaje", `${mensaje.categoria_mensaje}`);
    
    formData.append("tipo_pregrabado", `${mensaje.tipo_pregrabado}`);
    
    formData.append("dias_asociados", JSON.stringify(mensaje.dias_asociados));
    

    if (typeof (mensaje.file) === 'object')
    {
      formData.append('file', mensaje.file, mensaje.file.name);
    }
    else
    {
      formData.append("id_audio_pregrabado", `${mensaje.id_audio_pregrabado}`);
    }
    
    
    
    return this.http.post<any>(`${this.url}mensajes/externo`, formData, { headers: this.headers });
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

  xaprobarMensaje(id: number) {
    return this.http.post<any[]>(`${this.url}mensajes/xaprobar-mensaje/${id}`, { headers: this.headers });
    
  }
  getAudiosMensajes() {
    return this.http.get<any[]>(`${this.url}mensajes/relations/mensajes-and-pregrabados-categoria/all`, { headers: this.headers }).pipe(map(AudioMessages => {
      
      
      return AudioMessages.map((AudioMessage) => ({
        ...AudioMessage
      }));
    }));
  }

  getAudiosMensajesWithTiempo() {
    return this.getAudiosMensajes().pipe(
      switchMap((audioMessages) => {
        const tiempoRequests = audioMessages.map((audioMessage) =>
          this.getAudioDuration("http://208.76.84.103:3000/api/v1/client/file/mensajes-externo/Amor%20De%20Una%20Noche%20(N_Klabe%20feat%20Voltio)(MP3_320K).mp3").then((duration) => {
            console.log(": " + audioMessage.mensajes.nombre);
            return {
              ...audioMessage,
              tiempo: this.formatDuration(duration),
            };
            
          })
        );
        return Promise.all(tiempoRequests);
      })
    );
  }
  
  getAllHours()
  {
    this.getRushHours().subscribe(resp=>{
      this.horas = resp;
    });
    this.getNotRushHours().subscribe(resp=>{

    });
  }
  
  getRushHours()
  {
    return this.http.get<any[]>(`${this.url}mensajes/lv/horas-pico/all`, { headers: this.headers }).pipe(map(RushHours => {
      return RushHours.map((RushHour) => ({
        pico: 1,
        time: this.convertirHoraMilitarAHoraNoMilitar(RushHour.mensajes_lv_horas.hora),
        id: RushHour.mensajes_lv_horas.id,
        checked: false,
        pauta: ''
      }));
    }));
  }
  getNotRushHours()
  {
    return this.http.get<any[]>(`${this.url}mensajes/lv/horas-nopico/all`, { headers: this.headers }).pipe(map(NoRushHours => {
      return NoRushHours.map((NoRushHour) => ({
        pico: 0,
        time: this.convertirHoraMilitarAHoraNoMilitar(NoRushHour.mensajes_lv_horas.hora),
        id: NoRushHour.mensajes_lv_horas.id,
        checked: false,
        pauta: ''
      }));
    }));
  }
  convertirHoraMilitarAHoraNoMilitar(horaMilitar) {
    // Extraer las horas, los minutos y los segundos de la hora militar
    var horas = parseInt(horaMilitar.substring(0, 2));
    var minutos = horaMilitar.substring(3, 5);
    var segundos = horaMilitar.substring(6, 8);
  
    // Determinar si es AM o PM
    var periodo = (horas >= 12) ? 'PM' : 'AM';
  
    // Convertir las horas en formato de 24 horas a formato de 12 horas
    var horasNoMilitar = (horas > 12) ? horas - 12 : horas;
    if (horasNoMilitar === 0) {
      horasNoMilitar = 12; // Si son las 00:00, mostrar como 12 AM
      periodo = 'AM';
    }
  
    
    var horaNoMilitar = horasNoMilitar + ':' + minutos + ' ' + periodo;
  
    return horaNoMilitar;
  }

  getPautasPico()
  {
    return this.http.get<any[]>(`${this.url}mensajes/lv/pautas-pico/all`, { headers: this.headers }).pipe(map(Pautas => {
      return Pautas.map((Pauta) => ({
        code: Pauta.id,
        name: Pauta.numero_pautas_horas_pico
      }));
    }));
  }
  getPautasNoPico()
  {
    return this.http.get<any[]>(`${this.url}mensajes/lv/pautas-nopico/all`, { headers: this.headers }).pipe(map(Pautas => {
      return Pautas.map((Pauta) => ({
        code: Pauta.id,
        name: Pauta.numero_pautas_horas_nopico
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
  getAudioDuration(url: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const audio = new Audio();
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
      audio.addEventListener('error', (event: ErrorEvent) => {
        reject(event.error);
      });
      audio.src = url;
    });
  }
  
  formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  
  getPoints() {
    let id = 1;
    return this.http.get<any[]>(`${this.url}puntos/xcliente/${id}`, { headers: this.headers }).pipe(map(Points => {
      
      //this.points = Points;
      //console.log("tam: " + Points.length);
      return Points.map((Point) => ({
        ...Point,
        sucursal: Point.contratos[0].contrato.sucursal_instalacion.nombre,
        regional: Point.contratos[0].contrato.sucursal_instalacion.regionales_ciudades.regionales.nombre
      }));
    }));
  }
  getGroupsClient()
  {
    let id = 1;
    return this.http.get<any[]>(`${this.url}puntos/puntos-grupos/xcliente/${id}`, { headers: this.headers }).pipe(map(Groups => {
      return Groups.map((Group) => ({
        ...Group
      }));
    }));
  }
  getGroupsPoints() {
    let id_client = 1;
    return this.http.get<any[]>(`${this.url}puntos/puntos-grupos/xcliente/${id_client}`, { headers: this.headers }).pipe(
      switchMap(Groups => {
        const groupPromises = Groups.map((Group) => {
          return this.getPoints_Of_Group(Group.id).toPromise().then(points => ({
            id: Group.id,
            tabla: "tabl" + Group.id,
            header: "Grupo " + Group.nombre,
            tableData: points
          }));
        });
        return forkJoin(groupPromises);
      })
    );
  }
  
  getPoints_Of_Group(id: any) {
    return this.http.get<any[]>(`${this.url}puntos/relations/puntos-and-puntos-grupos/xgrupo/${id}`, { headers: this.headers }).pipe(
      map(Points => {
        if (Array.isArray(Points)) {
          return Points.map((Point) => ({ ...Point, sucursal: Point.puntos.contratos[0].contrato.sucursal_instalacion.nombre }));
        } else {
          // Manejar el caso en el que Points no es un array
          // Puede ser un objeto u otro tipo de dato no iterable
          return [];
        }
      })
    );
  }

  getRegionesPoints() {
    let id_client = 1;
    return this.http.get<any[]>(`${this.url}regionales/relations/regionales-and-clientes/xcliente/${id_client}`, { headers: this.headers }).pipe(
      switchMap(Regiones => {
        const groupPromises = Regiones.map((Region) => {
          return this.getPoints_Of_Region(Region.id).toPromise().then(points => ({
            id: Region.id,
            tabla: "tabl" + Region.id,
            header: "Región " + Region.regionales.nombre,
            tableData: points
          }));
        });
        return forkJoin(groupPromises);
      })
    );
  }

  getPoints_Of_Region(id: any) {
    return this.http.get<any[]>(`${this.url}regionales/relations/regionales-and-puntos/xregional/${id}`, { headers: this.headers }).pipe(
      map(Points => {
        if (Array.isArray(Points)) {
          return Points.map((Point) => ({ ...Point, sucursal: Point.puntos.contratos[0].contrato.sucursal_instalacion.nombre }));
        } else {
          // Manejar el caso en el que Points no es un array
          // Puede ser un objeto u otro tipo de dato no iterable
          return [];
        }
      })
    );
  }
  getGroups() {
    let id = 1;
    return this.http.get<any[]>(`${this.url}puntos/relations/puntos-and-puntos-grupos/xgrupo/${id}`, { headers: this.headers }).pipe(map(Groups => {
      return Groups.map((Group) => ({
        ...Group
      }));
    }));
  }
  getRegionals() {
    let id = 1;
    return this.http.get<any[]>(`${this.url}regionales/relations/regionales-and-clientes/xcliente/${id}`, { headers: this.headers }).pipe(map(Regionals => {
      return Regionals.map((Regional) => ({
        ...Regional
      }));
    }));
  }

  
  getAprobacionAudios() {
    let id = 1;
    return this.http.get<any[]>(`${this.url}mensajes/xaprobar/xcliente/${id}`, { headers: this.headers }).pipe(map(Aprobacions => {
      return Aprobacions.map((Aprobacion) => ({
        ...Aprobacion,
        playing: false
      }));
    }));
  }

  
}
