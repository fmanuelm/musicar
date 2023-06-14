import { Component, OnInit } from '@angular/core';
import { MessageService  } from '../../service/message.service';

@Component({
  selector: 'app-ruchhours',
  templateUrl: './ruchhours.component.html',
  styleUrls: ['./ruchhours.component.css']
})
export class RuchhoursComponent implements OnInit {
  fromDate: Date = new Date();
  toDate: Date = new Date();
  feriados: string;
  daysOfWeek: any[] = [{label: 'Lu', value: 'lu'}, {label: 'Ma', value: 'ma'}, {label: 'Mi', value: 'mi'}, {label: 'Ju', value: 'ju'}, {label: 'Vi', value: 'vi'}, {label: 'Sa', value: 'sa'}, {label: 'Do', value: 'do'}];
  daySelect: string = 'lu';
  horas:any;
  pautas:any;
  constructor(private messageService: MessageService) { }
  
  ngOnInit(): void {
    this.horas = [
      {no: 5, time: '02 AM', pico: 1 },
      {no: 5, time: '03 AM', pico: 0 },
      {no: 5, time: '04 AM', pico: 0 },
      {no: 5, time: '05 AM', pico: 0 },
      {no: 5, time: '06 AM', pico: 0 },
      {no: 5, time: '07 AM', pico: 1 },
      {no: 5, time: '08 AM', pico: 1 },
      {no: 5, time: '09 AM', pico: 0 },
      {no: 5, time: '10 AM', pico: 0 },
      {no: 5, time: '11 AM', pico: 1 },
      {no: 5, time: '12 M', pico: 0 },
      {no: 5, time: '01 PM', pico: 0 },
      {no: 5, time: '02 PM', pico: 1 },
      {no: 5, time: '03 PM', pico: 0 },
      {no: 5, time: '04 PM', pico: 0 },
      {no: 5, time: '05 PM', pico: 0 },
      {no: 5, time: '07 PM', pico: 1 },
      {no: 5, time: '08 PM', pico: 0 },
      {no: 5, time: '09 PM', pico: 1 },
      {no: 5, time: '10 PM', pico: 0 },
      {no: 5, time: '11 PM', pico: 0 },
      {no: 5, time: '12 PM', pico: 0 },
    ];
    this.pautas = [
      { name: '1', code: '1'},
      { name: '2', code: '2'},
      { name: '3', code: '3'}
    ];
  }


  next() {

  }
  next1()
  {
    this.messageService.setStep("puntos");
  }
  next_b()
  {
    this.messageService.setStep("grupo");

  }
  next_c()
  {
    this.messageService.setStep("regional");

  }
  next_d()
  {
    this.messageService.setStep("puntos_grupo_regional");

  }
}
