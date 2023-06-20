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

  constructor(private route: ActivatedRoute, private messageService: MessageService, private location: Location, private http: HttpClient, private sanitizer: DomSanitizer) { }
  audioUrl: SafeUrl;
  id:number;
  items: any[];
  audios: any[]=[
    { nombre: 'Archivo 1', src: 'assets/audio/archivo1.mp3', name: 'archivo1.mp3', tiempo:'02:20' },
    { nombre: 'Archivo 2', src : 'assets/audio/archivo2.mp3', name: 'archivo2.mp3', tiempo:'03:20' }
  ];
  audioSrc: string = "";
  
  reproduciendo : boolean = false;
  audio_select_id: number = null;
  categoria_nombre: string = "";
  categoria_id:number = 0;
  messages: any[] = [];
  reproduciendo_id:number;
  audioEnded:any;
  @ViewChild('audioPlayer') audioPlayer: any;
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Hacer algo con el parámetro id...
      this.categoria_nombre = this.messageService.getCategoryName(params['id']);
      
    });
    this.categoria_nombre = this.messageService.getCategorySelect().title;
    this.categoria_id = this.messageService.getCategorySelect().id;
    this.loadMessagesAudios(this.categoria_id);
    
        
  }

  atras() {
    this.messageService.setStep("formulario");
  }

  getMessagesPresaved(id:number) {
    this.messageService.getMensajesPregrabados(id).subscribe(resp => {
      this.messages = resp;
      
    })
  }

  loadMessagesAudios(id_cat: number) {
    
    this.messageService.getMensajesPregrabados(id_cat).subscribe(resp => {
      this.audios = resp;
        
    })
  }

  onAudioEnded() {
    this.reproduciendo_id = null;
  }
  play(idx: number)
  {
    
    this.reproduciendo_id = idx;
    this.audioSrc = this.audios[idx].src;
    const name = this.audios[idx].name;
    
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
}
