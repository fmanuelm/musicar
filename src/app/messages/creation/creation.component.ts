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
  
  constructor(private messageService: MessageService) {
    //this.activeIndex = this.messageService.getStep();
    
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
  next2()
  {
    this.messageService.setStep("formulario");
  }
  changeStep(param:any)
  {
    
    //if (param === 0)
    //{
      //this.messageService.setStep("1");
    //}
    //else {
      this.messageService.step$.subscribe(value => {
        this.step = value;
        
        if (value === "-1" || value === "1")
        {
          //this.activeIndex = 0;
        }
        if(value === 'formulario') {
          //this.activeIndex = 1;
          if (param === 0)
          {
            this.messageService.setStep("1");
            this.activeIndex = param;
          }
        }
        if(value === 'puntos') {
          //this.activeIndex = 3;
          
        }
        if(value === 'horas_fijas') {
          //this.activeIndex = 2;
          if (param === 0)
          {
            this.messageService.setStep("1");
            this.activeIndex = param;
          }
          if (param === 1)
          {
            this.messageService.setStep("formulario");
            this.activeIndex = param;
          }
        }
        if(value === 'secuencia') {
          //this.activeIndex = 2;
          if (param === 0)
          {
            this.messageService.setStep("1");
            this.activeIndex = param;
          }
          if (param === 1)
          {
            this.messageService.setStep("formulario");
            this.activeIndex = param;
          }
        }
        if(value === 'rushhours') {
          //this.activeIndex = 2;
          if (param === 0)
          {
            this.messageService.setStep("1");
            this.activeIndex = param;
          }
          if (param === 1)
          {
            this.messageService.setStep("formulario");
            this.activeIndex = param;
          }
        }
        
        if (value === 'puntos' || value === 'grupo' || value === 'regional' || value === 'puntos_grupo_regional')
        {
          this.activeIndex = 3;
        }
        if(value === 'resumen1' || value === 'resumen2') {
          this.activeIndex = 4;
        }
      });
    //}
    /*
    this.messageService.setStep("puntos");
    this.messageService.setStep("grupo");
    this.messageService.setStep("regional");
    this.messageService.setStep("puntos_grupo_regional");
    this.messageService.setStep("formulario");
    */
  }
  ngOnInit(): void {
    //this.step = this.messageService.getStep();
    //let tipo_usuario = "Cliente Administrador Punto";
    let tipo_usuario = "Cliente Grupo Puntos";
    
    //let tipo_usuario = "Cliente Regional Puntos";
    //let tipo_usuario = "Cliente Administrador";
    localStorage.setItem("tipo_usuario", tipo_usuario);
    this.step = this.messageService.getStep();
    this.messageService.step$.subscribe(value => {
      
      this.step = value;
      console.log(`inside step is ${this.step}`);
      console.log(`inside value is ${this.value}`);
      if (value === "-1" || value === "1")
      {
        this.activeIndex = 0;
      }
      if(value === 'formulario') {
        this.activeIndex = 1;
      }
      if(value === 'puntos') {
        this.activeIndex = 3;
      }
      if(value === 'horas_fijas') {
        this.activeIndex = 2;
      }
      if(value === 'secuencia') {
        this.activeIndex = 2;
      }
      if(value === 'rushhours') {
        this.activeIndex = 2;
      }
      
      if (value === 'puntos' || value === 'grupo' || value === 'regional' || value === 'puntos_grupo_regional')
      {
        this.activeIndex = 3;
      }
      if(value === 'resumen1' || value === 'resumen2') {
        this.activeIndex = 4;
      }
    });

    this.items = [
      {
          label: 'CREACIÓN'
      },
      {
          label: 'CONTENIDO'
      },
      {
          label: 'PROGRAMACIÓN'
      },
      {
          label: 'PUNTOS'
      },
      {
        label: 'RESUMEN'
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
