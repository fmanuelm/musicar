import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;
  constructor() { }

  ngOnInit(): void {
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

}
