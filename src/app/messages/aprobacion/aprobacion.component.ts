import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.css'],
  providers: [MessageService]
})
export class AprobacionComponent implements OnInit {

  constructor(public router: Router, private messageService: MessageService) { }
  id:string = '';
  referencia:string = '';
  texto:string = '';
  step: string = 'step1';

  ngOnInit(): void {
  }

  approve(id: number)
  {
    this.step = 'step2';
  }
  back() {
    this.step = 'step1';
  }
  approve2()
  {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'El mensaje se ha aprobado de manera correcta' });
  }
  restore()
  {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Devolución mensaje' });
  }
}
