import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  constructor(private messageService: MessageService, private router: Router) { }
  messagesList:any[];
  titleTree1:string;
  titleTree2:string;
  titleTree3:string;
  ngOnInit(): void {
    this.getMessagesOutline();
  }

  getMessagesOutline() {
    this.messageService.getMessagesOutlineType().subscribe(resp => {
      this.messagesList = resp;
      this.titleTree1 = resp[0].nombre;
      this.titleTree2 = resp[1].nombre;
      this.titleTree3 = resp[2].nombre;
    })
  }
  horas_fijas() {
    
    this.messageService.setStep("3");
    
  }
  secuencia() {
    this.messageService.setStep("4");
  }
  locutor_virtual() {
    this.messageService.setStep("rushhours");
  }
  atras()
  {
    this.router.navigate(['/mensajes/home']);
  }
}
