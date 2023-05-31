import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService  } from '../service/message.service';


@Component({
  selector: 'app-creation', 
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 1;
  daysOfWeek: any[] = [{label: 'Lu', value: 'lu'}, {label: 'Ma', value: 'ma'}, {label: 'Mi', value: 'mi'}, {label: 'Ju', value: 'ju'}, {label: 'Vi', value: 'vi'}, {label: 'Sa', value: 'sa'}, {label: 'Do', value: 'do'}];
  value: string = 'lu';
  daysOfWeekVal3: string = '';
  fromDate: Date;
  toDate: Date;
  fromDate3: Date;
  toDate3: Date;
  feriados: string;
  feriados3: string;
  timeStart: Date;
  timeEnd: Date;
  time3: Date;
  hour3: Date;
  timeStartList: any[] = [];
  timeEndList: any[] = [];
  hourList3: any[] = [];
  timeList3: any[] = [];
  timeSelected:string;
  footer_opt3_1:boolean;
  footer_opt3_2:boolean;
  footer_opt4_1:boolean;
  footer_opt4_2:boolean;
  step:string = "0";
  
  constructor(private messageService: MessageService) {
    //this.activeIndex = this.messageService.getStep();
    
  }
  next1()
  {
    this.messageService.setStep("2");
  }
  next2()
  {
    this.messageService.setStep("2");
  }
  ngOnInit(): void {
    //this.step = this.messageService.getStep();
    
    this.step = this.messageService.getStep();
    this.messageService.step$.subscribe(value => {
      this.step = value;
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
    this.fromDate = new Date();
    this.toDate = new Date();
    this.fromDate3 = new Date();
    this.toDate3 = new Date();
  }
  setTimeStart() {
    let res = this.timeStart.toLocaleTimeString();
    this.timeStartList.push(res);
  }
  setTime3() {
    let res = this.time3.toLocaleTimeString();
    this.timeList3.push(res);
  }
  removeTime33(index: number) {
    this.timeList3.splice(index, 1);
  }
  removeTimeStart(index: number) {
    this.timeStartList.splice(index, 1);
  }
  setTimeEnd() {
    let res = this.timeEnd.toLocaleTimeString();
    this.timeEndList.push(res);
  }
  removeTimeEnd(index: number) {
    this.timeEndList.splice(index, 1);
  }
  setHours3() {

  }
  addTime3() {
    this.hourList3.push(this.hour3.toLocaleTimeString());
  }
  removeTime3(index: number) {
    this.hourList3.splice(index, 1);
  }
}
