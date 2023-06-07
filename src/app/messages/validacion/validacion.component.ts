import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {

  constructor(private messageService: MessageService, public router: Router) { }
  sucursales: any[];
  selectedSucursal: any;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  mensajes: any[] = [];
  selectedMensajes: {};

  ngOnInit(): void {
    this.sucursales = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.mensajes = [
      {
        id: 'cosa.txt',
        referencia: 'cosa.txt',
        tipo_esquema: 'cosa.txt',
        fecha: '12/12/22',
        hora: '12:12'
      },
      {
        id: 'cosa2.txt',
        referencia: 'cosa2.txt',
        tipo_esquema: 'cosa2.txt',
        fecha: '07/08/23',
        hora: '12:12'
      }
    ];

    this.fromDate = new Date();
    this.toDate = new Date();
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return event.order * result;
    });
  }

}
