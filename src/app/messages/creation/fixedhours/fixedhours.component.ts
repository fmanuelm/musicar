import { Component, OnInit } from '@angular/core';
import { MessageService  } from '../../service/message.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-fixedhours',
  templateUrl: './fixedhours.component.html',
  styleUrls: ['./fixedhours.component.css']
})
export class FixedhoursComponent implements OnInit {

  constructor(private messageService: MessageService) { }
  items: MenuItem[];
  activeIndex: number = 0;
  daysOfWeek: any[] = [{label: 'Lu', value: 'Lunes'}, {label: 'Ma', value: 'Martes'}, {label: 'Mi', value: 'Miercoles'}, {label: 'Ju', value: 'Jueves'}, {label: 'Vi', value: 'Viernes'}, {label: 'Sa', value: 'Sabado'}, {label: 'Do', value: 'Domingo'}];
  value: string = 'lu';
  daysOfWeekVal: any = [];
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
  aprobar_mensaje:boolean = false;
  termina_cancion:boolean = false;
  footer_opt4_1:boolean;
  footer_opt4_2:boolean;
  step:string = "0";
  tipo_de_dias:number = 1;
  next1()
  {
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
  
  
  ngOnInit(): void {
    this.fromDate = new Date();
    this.toDate = new Date();
    this.fromDate3 = new Date();
    this.toDate3 = new Date();

    this.scrollTop();
  }
  convertirFecha(fechaString) {
    const fecha = new Date(fechaString);
  
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
  
    return `${dia}/${mes}/${año}`;
  }
  cleanHours(hora: string)
  {
    let resp = hora.replace(/PM/g, '');
    resp = resp.replace(/AM/g, '');
    resp = resp.trimEnd();
    return resp;
  }
  convertirAHoraMilitar(hora) {
    // Separar las horas y minutos
    var partes = hora.split(':');
    var horas = parseInt(partes[0]);
    var minutos = parseInt(partes[1]);
  
    // Verificar si es necesario ajustar las horas
    if (horas === 12 && minutos === 0) {
      return '12:00';  // Caso especial: 12:00 PM se mantiene como 12:00 en hora militar
    } else if (horas < 12 && hora.toLowerCase().includes('pm')) {
      horas += 12;  // Agregar 12 horas para convertir a hora militar si es PM
    }
  
    // Formatear las horas y minutos en formato de hora militar
    var horasMilitar = horas.toString().padStart(2, '0');
    var minutosMilitar = minutos.toString().padStart(2, '0');
  
    return horasMilitar + ':' + minutosMilitar;
  }
  
  storeData()
  {
    let arrayHoras = this.timeList3;
    let arrayHorasMilitar = arrayHoras.map((hora) => {
      return this.convertirAHoraMilitar(hora);
    });
    const horas_tocado_mensaje = arrayHorasMilitar.map((hora, index) => ({
      [`${index + 1}`]: { hora }
    })).reduce((accumulator, currentValue) => ({
      ...accumulator,
      ...currentValue
    }), {});

    const datosForm = {
      fechas_programacion_mensaje: {
        fecha_inicio: this.convertirFecha(this.fromDate),
        fecha_fin: this.convertirFecha(this.toDate)
      },
      horas_tocado_mensaje: horas_tocado_mensaje,
      mensaje_tipo_esquema: 1,
      tipo_de_dias: this.tipo_de_dias,
      dias_asociados: this.daysOfWeekVal,
      aprobar_mensaje: this.aprobar_mensaje,
      termina_cancion: this.termina_cancion
    };
    this.messageService.setMsgExterno(datosForm);
  }
  scrollTop()
  {
    const element = document.getElementById('topDiv');
    if (element) {
      element.scrollIntoView();
    }
  }

  setTimeStart() {
    let res = this.timeStart.toLocaleTimeString();
    this.timeStartList.push(res);
  }
  setTime3() {
    let hour:any;
    let min:any;
    const timeString = this.time3.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    
    let res = `${timeString}`;
    
    if (this.timeList3.includes(res))
    {
      alert("Ya fue agregado");
    }
    else
    {
      this.timeList3.push(res);
    }
    
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
