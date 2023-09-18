import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { MessageService as MessageService2 } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
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
  playing:boolean = false;
  @ViewChild('audioPlayer') audioPlayer: any;
  @ViewChild('audioPlayer2') audioPlayer2: any;
  @ViewChild('errorModal') errorModal: ElementRef;
  ngOnInit(): void {
    this.getAprobarAudios();
    
    this.formModalDevolver = this._formBuilder.group({
      motivo_devolucion: [null, [Validators.required]],
      observaciones: [null]
    });
  }

  pause(idx: number)
  {
    this.xaprobarAduios[idx].playing = false;
    if (idx === this.reproduciendo_id)
    {
      this.audioPlayer.nativeElement.currentTime = 0;
      this.audioPlayer.nativeElement.pause();
      this.reproduciendo_id = null;
    }
    
  }

  play(idx: number)
  {
    
    this.reproduciendo_id = idx;
    this.audioSrc = this.xaprobarAduios[idx].url_audio;
    const name = this.xaprobarAduios[idx].nombre;
    this.xaprobarAduios[idx].playing = true;
    
    
      this.http.get(this.audioSrc, { responseType: 'blob' }).subscribe((response: Blob) => {
      //this.http.get("https://mediosefectivos.co/himno-nacional.mp3", { responseType: 'blob' }).subscribe((response: Blob) => {
        /*
        let file = new File([response], name);
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const contenido = event.target.result;
          this.audioPlayer.nativeElement.src = contenido;
          this.audioPlayer.nativeElement.play();
          
          //this.audioUrl = contenido;
        };
        */
        
        //reader.readAsDataURL(file);
        this.reproduciendo_id = idx;
        const audioSrc = this.xaprobarAduios[idx].url_audio;
        
        const sourceElement = document.createElement('source');
        sourceElement.src = audioSrc;
        sourceElement.type = 'audio/mpeg'; // Tipo MIME para archivos MP3
        
        this.audioPlayer.nativeElement.innerHTML = ''; // Limpiamos cualquier fuente previa
        this.audioPlayer.nativeElement.appendChild(sourceElement);
        
        this.audioPlayer.nativeElement.load();
        this.audioPlayer.nativeElement.play();
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
  getCausalesDevolucion()
  {
    
    this.messageService.getMensajeById(this.id).subscribe(resp0 => {
      let id_dev = resp0.mensajes_estado.id;
      this.messageService.getCausalesDevolucion(id_dev).subscribe(resp => {
        let resp2: any = resp;
        if (resp2.status !== 204)
        {
          this.typeMotivo = resp;
        }
        console.log("causales devolucion de mensajes");
        console.log(resp);
      });
    });
  }
  aprobarApi(id: number)
  {
    this.messageService.xaprobarMensaje(id).subscribe(resp => {
      console.log(resp);
      if (resp.status === 202)
      {
        swal.fire({
          title: 'Aprobado',
          text: "El mensaje se ha aprobado",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success",
          }
        });
      }
      else {
        swal.fire({
          title: 'Error.',
          text: "Hubo un error en la aprobación del mensaje. Por favor reinicie la pagina y si el problema persiste comuníquese con el área encargada.",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-danger",
          }
        });
      }
      
    });
  }
  open(id: number, referencia:string, texto:string, url_audio:string)
  {
    this.id = id;
    this.referencia = referencia;
    this.texto = texto;
    this.url_audio = url_audio;
    this.getCausalesDevolucion();
    const sourceElement = document.createElement('source');
    sourceElement.src = url_audio;
    sourceElement.type = 'audio/mpeg'; // Tipo MIME para archivos MP3
    
    this.audioPlayer2.nativeElement.innerHTML = ''; // Limpiamos cualquier fuente previa
    this.audioPlayer2.nativeElement.appendChild(sourceElement);
    
    this.audioPlayer2.nativeElement.load();
    this.step = 'step2';
  }
  back() {
    this.step = 'step1';
  }
  cancelModal()
  {

  }
  aprobarMensaje()
  {
    this.messageService.xaprobarMensaje(this.id).subscribe(resp => {
      console.log(resp);
      console.log("status: " + resp.status);
      if (resp.status === 202)
      {
        swal.fire({
          title: 'Aprobado',
          text: "El mensaje se ha aprobado",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success",
          }
        });
      }
      else {
        swal.fire({
          title: 'Error.',
          text: "Hubo un error en la aprobación del mensaje. Por favor reinicie la pagina y si el problema persiste comuníquese con el área encargada.",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-danger",
          }
        });
      }
      
    });
  }
  aceptModal()
  {
    let data = {
      mensajes: this.id,
      mensajes_devolucion_cliente : this.formModalDevolver.get('motivo_devolucion').value,
      observaciones: this.formModalDevolver.get('observaciones').value
    };
    console.log(data);
    this.messageService.storeDevolucionMensaje(data).subscribe(resp => {
      console.log(resp);
      if (resp.status === 201 || resp.status === 200)
      {
        swal.fire({
          title: 'Confirmación.',
          text: resp.message,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success",
          },
          icon: 'success'
        });
        this.router.navigate(
          ['mensajes/aprobacion']
        );
      }
      if (resp.status === 409)
      {
        swal.fire({
          title: 'Error.',
          text: "Hubo un error en la devolución del mensaje. Por favor reinicie la pagina y si el problema persiste comuníquese con el área encargada.",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-danger",
          }
        });
      }
      
    });
  }
}
