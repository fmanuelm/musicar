import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { MessageService as MessageService2 } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.css'],
  providers: [MessageService2]
})
export class AprobacionComponent implements OnInit {

  constructor(public router: Router, private messageService: MessageService, private messageService2: MessageService2, private http: HttpClient, private _formBuilder: FormBuilder) { }
  audioSrc: string = "";
  audioUrl: SafeUrl;
  url_audio:string = "";
  reproduciendo_id:number;
  id:number = null;
  referencia:string = '';
  texto:string = '';
  step: string = 'step1';
  xaprobarAduios:any[]=[];
  typeMotivo:any[]=[];
  formModalDevolver: FormGroup;
  @ViewChild('audioPlayer') audioPlayer: any;
  ngOnInit(): void {
    this.getAprobarAudios();
    this.typeMotivo = [

    ];
    this.formModalDevolver = this._formBuilder.group({
      motivo_devolucion: [null, [Validators.required]]
    });
  }

  play(idx: number)
  {
    
    this.reproduciendo_id = idx;
    this.audioSrc = this.xaprobarAduios[idx].url_audio;
    const name = this.xaprobarAduios[idx].nombre;
    
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

  onAudioEnded() {
    this.reproduciendo_id = null;
  }
  getAprobarAudios()
  {
    this.messageService.getAprobacionAudios().subscribe(resp=>{
      this.xaprobarAduios = resp;
      console.log(resp);
    });
  }
  aprobarApi(id: number)
  {
    this.messageService.xaprobarMensaje(id).subscribe(resp=>{
      console.log(resp);
    });
  }
  open(id: number, referencia:string, texto:string, url_audio:string)
  {
    this.id = id;
    this.referencia = referencia;
    this.texto = texto;
    this.url_audio = url_audio;

    this.step = 'step2';
  }
  back() {
    this.step = 'step1';
  }
  cancelModal()
  {

  }
  aceptModal()
  {
    
  }
}
