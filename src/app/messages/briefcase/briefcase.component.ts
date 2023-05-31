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
  categoria_nombre: string = "";
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Hacer algo con el parámetro id...
      this.categoria_nombre = this.messageService.getCategoryName(params['id']);
      
    });
    this.items = [
      {
          label: 'CREACIÓN',
          routerLink: 'personal'
      },
      {
          label: 'CONTENIDO',
          routerLink: 'seat'
      },
      {
          label: 'PROGRAMACIÓN',
          routerLink: 'payment'
      },
      {
          label: 'PUNTOS',
          routerLink: 'confirmation'
      },
      {
        label: 'RESUMEN',
        routerLink: 'confirmation'
    }
    ];
  }

  atras() {
    this.messageService.setStep("formulario");
    
  }

}
