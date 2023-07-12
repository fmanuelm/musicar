import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../service/message.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-briefcase',
  templateUrl: './briefcase.component.html',
  styleUrls: ['./briefcase.component.css']
})
export class BriefcaseComponent implements OnInit {
  duration: number | null = null;
  constructor(private route: ActivatedRoute, private messageService: MessageService, private location: Location, private http: HttpClient, private sanitizer: DomSanitizer) { }
  audioUrl: SafeUrl;
  id:number;
  items: any[];
  /*
  audios: any[]=[
    { nombre: 'Archivo 1', src: 'assets/audio/archivo1.mp3', name: 'archivo1.mp3', tiempo:'02:20' },
    { nombre: 'Archivo 2', src : 'assets/audio/archivo2.mp3', name: 'archivo2.mp3', tiempo:'03:20' }
  ];
  */
  audios: any[]=[];
  audioSrc: string = "";
  
  reproduciendo : boolean = false;
  audio_select_id: number = null;
  categoria_nombre: string = "";
  categoria_id:number = 0;
  messages: any[] = [];
  reproduciendo_id:number;
  audioEnded:any;
  optionSelected:string = null;
  tiempo_duracion:any = null;
  @ViewChild('audioPlayer') audioPlayer: any;
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Hacer algo con el parámetro id...
      this.categoria_nombre = this.messageService.getCategoryName(params['id']);
      
    });
    this.categoria_nombre = this.messageService.getCategorySelect().title;
    this.categoria_id = this.messageService.getCategorySelect().id;
    this.loadMessagesAudios();
    
    //this.getAudioDuration("http://208.76.84.103:3000/api/v1/client/file/mensajes-externo/Amor%20De%20Una%20Noche%20(N_Klabe%20feat%20Voltio)(MP3_320K).mp3");      
  }

  atras() {
    this.messageService.setStep("formulario");
  }

  getMessagesPresaved(id:number) {
    this.messageService.getMensajesPregrabados(id).subscribe(resp => {
      this.messages = resp;
      
    })
  }

  loadMessagesAudios() {
    
    this.messageService.getAudiosMensajes().subscribe(resp => {
      this.audios = resp;
        
    })
  }

  
  onAudioEnded() {
    this.reproduciendo_id = null;
  }
  play(idx: number)
  {
    
    this.reproduciendo_id = idx;
    this.audioSrc = this.audios[idx].mensajes.url_audio;
    const name = this.audios[idx].name;
    console.log("name: " + name);
    this.http.get(this.audioSrc, { responseType: 'blob' }).subscribe((response: Blob) => {
      let file = new File([response], name);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const contenido = event.target.result;
        this.audioPlayer.nativeElement.src = contenido;
        this.audioPlayer.nativeElement.play();
        //this.audioUrl = contenido;
      };
      
      
      reader.readAsDataURL(file);
    });
    
    
  }
  /*
  getTimeAudio(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const audio = new Audio();
      audio.addEventListener('loadedmetadata', () => {
        console.log('Metadata loaded');
        const duration = audio.duration;
        const formattedDuration = this.formatDuration(duration);
        resolve(formattedDuration);
      });
      audio.addEventListener('error', (event: ErrorEvent) => {
        reject(event.error);
      });
      audio.src = url;
    });
    
  }
  */

  formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  getAudioDuration(url: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const audio = new Audio();
      audio.addEventListener('loadedmetadata', () => {
        this.tiempo_duracion = audio.duration;
        resolve(audio.duration);
      });
      audio.addEventListener('error', (event: ErrorEvent) => {
        reject(event.error);
      });
      audio.src = url;
    });
  }
  
  pause(idx: number)
  {
    if (idx === this.reproduciendo_id)
    {
      this.audioPlayer.nativeElement.currentTime = 0;
      this.audioPlayer.nativeElement.pause();
      this.reproduciendo_id = null;
    }
    
  }

  selectAudio(idx:number)
  {
    
    this.audio_select_id = idx;
    
  }

  deselectRadio(option: any) {
    
    
    if (option === this.optionSelected) {
      this.optionSelected = null; // O puedes establecerlo en una cadena vacía: ''
      //alert("deselecciona");
    }
    
  }

  storeData()
  {
    const datosForm = {
      id_audio_pregrabado: this.optionSelected
    };
    this.messageService.setMsgExterno(datosForm);
    console.log("el Id: " + this.optionSelected);
  }

  
  

  next() {
    this.storeData();
    if (this.messageService.getModule() === 'horas_fijas')
    {
      this.messageService.setStep("horas_fijas");
    }
    if (this.messageService.getModule() === 'secuencia')
    {
      this.messageService.setStep("secuencia");
    }
    if (this.messageService.getModule() === 'locutor_virtual')
    {
      this.messageService.setStep("rushhours"); 
    }  
  }
}
