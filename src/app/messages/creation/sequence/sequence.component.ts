import { Component, OnInit } from '@angular/core';
import { MessageService  } from '../../service/message.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent implements OnInit {

  constructor(private messageService: MessageService) { }
  items: MenuItem[];
  activeIndex: number = 0;
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
  next2()
  {
    this.messageService.setStep("formulario");
  }

  ngOnInit(): void {
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
