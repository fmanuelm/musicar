import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../service/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-briefcase',
  templateUrl: './briefcase.component.html',
  styleUrls: ['./briefcase.component.css']
})
export class BriefcaseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private messageService: MessageService, private location: Location) { }
  id:number;
  items: any[];
  audios: any[]=[];
  categoria_nombre: string = "";
  categoria_id:number = 0;
  messages: any[] = [];
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
}
