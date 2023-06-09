import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';
@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.css']
})
export class PuntosComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  next1()
  {
    this.messageService.setStep("resumen1");
  }
  next2()
  {
    this.messageService.setStep("resumen2");
  }
}
