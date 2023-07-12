import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService  } from '../../service/message.service';

@Component({
  selector: 'app-ruchhours',
  templateUrl: './ruchhours.component.html',
  styleUrls: ['./ruchhours.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RuchhoursComponent implements OnInit {
  fromDate: Date = new Date();
  toDate: Date = new Date();
  feriados: string;
  daysOfWeek: any[] = [{label: 'Lu', value: 'Lunes'}, {label: 'Ma', value: 'Martes'}, {label: 'Mi', value: 'Miercoles'}, {label: 'Ju', value: 'Jueves'}, {label: 'Vi', value: 'Viernes'}, {label: 'Sa', value: 'Sabado'}, {label: 'Do', value: 'Domingo'}];
  daysOfWeekVal: any = [];
  
  horas:any = [];
  pautas:any;
  pautasPico: any[];
  pautasNoPico: any[];
  checkHorasPico:any;
  checkHorasNoPico:any;
  selectedRushHours: { [key: string]: boolean } = {};
  selectedNoRushHours: { [key: string]: boolean } = {};
  tipo_de_dias:number = 1;
  horas_pico:any[] = [];
  horas_no_pico:any[] = [];
  nopicoModel: any;
  constructor(private messageService: MessageService) { }
  
  ngOnInit(): void {
    
    this.pautas = [
      { name: '1', code: '1'},
      { name: '2', code: '2'},
      { name: '3', code: '3'}
    ];

    this.scrollTop();
    this.getNoRushHours();
    this.getRushHours();
    this.getPautasPico();
    this.getPautasNoPico();
  }
  setPautasPico(option:any)
  {
    
    //alert("Pautas Pico");
    for (let i = 0; i < this.horas.length; i++) {
      const hora = this.horas[i];
      if (hora.pico === 1) {
        this.horas[i].pauta = option;
      }
    }
    console.log("horas code: " + this.horas[this.horas.length - 1].pauta.code);
    console.log("horas name: " + this.horas[this.horas.length - 1].pauta.name);
  }
  setPautasNoPico(option:any)
  {
    
    for (let i = 0; i < this.horas.length; i++) {
      const hora = this.horas[i];
      if (hora.pico === 0) {
        this.horas[i].pauta = option;
      }
    }
  }
  mostrarsel()
  {
    this.horas.map((hora)=>{
      console.log("val: " + hora.pauta.name);
    })
  }
  

  checkHorasNoPicoChanged() {
    // checkHorasNoPico
    if (this.checkHorasNoPico)
    {
      for (let i = 0; i < this.horas.length; i++) {
        const hora = this.horas[i];
        if (hora.pico === 0) {
          hora.checked = true;
        }
      }
    }
    else {
      for (let i = 0; i < this.horas.length; i++) {
        const hora = this.horas[i];
        if (hora.pico === 0) {
          hora.checked = false;
        }
      }
    }
  }
  checkHorasPicoChanged() {
    if (this.checkHorasPico)
    {
      for (let i = 0; i < this.horas.length; i++) {
        const hora = this.horas[i];
        if (hora.pico === 1) {
          hora.checked = true;
        }
      }
    }
    else {
      for (let i = 0; i < this.horas.length; i++) {
        const hora = this.horas[i];
        if (hora.pico === 1) {
          hora.checked = false;
        }
      }
    }
  }
  scrollTop()
  {
    const element = document.getElementById('topDiv');
    if (element) {
      element.scrollIntoView();
    }
  }
  

  
  storeData()
  {
    for (let i = 0; i < this.horas.length; i++) {
      const newValuePauta = this.horas[i].pauta.code;
      this.horas[i].pauta = newValuePauta;
    }
    const datosForm = {
      fechas_programacion_mensaje: {
        fecha_inicio: this.convertirFecha(this.fromDate),
        fecha_fin: this.convertirFecha(this.toDate)
      },
      dias_asociados: this.daysOfWeekVal,
      tipo_de_dias: this.tipo_de_dias,
      mensaje_tipo_esquema: 3,
      horas_pico: this.horas_pico,
      horas_no_pico: this.horas_no_pico,
    };
    console.log("horas pico: ");
    console.log(this.horas_pico);
    console.log("horas no pico: ");
    console.log(this.horas_no_pico);
    this.messageService.setMsgExterno(datosForm);
  }
  
  convertirFecha(fechaString) {
    const fecha = new Date(fechaString);
  
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
  
    return `${dia}/${mes}/${año}`;
  }
  getPautasPico()
  {
    this.messageService.getPautasPico().subscribe(resp=>{
      this.pautasPico = resp;
    });
  }

  getPautasNoPico()
  {
    this.messageService.getPautasNoPico().subscribe(resp=>{
      this.pautasNoPico = resp;
    });
  }

  
  getNoRushHours()
  {
    this.messageService.getNotRushHours().subscribe(resp => {
      //this.messages = resp;
      //this.horas = resp;
      //console.log("horas no pico: " + resp[0].time);
      resp.map(cur_hora => {
        this.horas.push(cur_hora);
      });
      //this.selectedRushHours;
    });
  }
  getRushHours()
  {
    this.messageService.getRushHours().subscribe(resp => {
      //this.messages = resp;
      //console.log("horas pico: " + resp[0].time);
      resp.map(cur_hora => {
        this.horas.push(cur_hora);
      });
    });
  }
  
  next1()
  {
    
    this.horas.map((cur_hora, index)=>{
      if (cur_hora.checked === true)
      {
        if(cur_hora.pico === 1)
        {
          this.horas_pico.push({
            id_hora_pico: cur_hora.id,
            id_pautas_pico: cur_hora.pauta.code
          });
        }
        else
        {
          this.horas_no_pico.push({
            id_hora_pico: cur_hora.id,
            id_pautas_pico: cur_hora.pauta.code
          });
        }
      }
    });
    this.storeData();
    const tipoUsuario = localStorage.getItem("tipo_usuario");
    if (tipoUsuario === 'Cliente Administrador Punto')
    {
      this.messageService.setStep("puntos");
    }
    if (tipoUsuario === 'Cliente Grupo Puntos')
    {
      this.messageService.setStep("grupo");
    }
    if (tipoUsuario === 'Cliente Regional Puntos')
    {
      this.messageService.setStep("regional");
    }
    if (tipoUsuario === 'Cliente Administrador')
    {
      this.messageService.setStep("puntos_grupo_regional");
    }
  }
  
}
