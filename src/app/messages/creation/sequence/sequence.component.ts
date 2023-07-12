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
  daysOfWeek: any[] = [{label: 'Lu', value: 'Lunes'}, {label: 'Ma', value: 'Martes'}, {label: 'Mi', value: 'Miercoles'}, {label: 'Ju', value: 'Jueves'}, {label: 'Vi', value: 'Viernes'}, {label: 'Sa', value: 'Sabado'}, {label: 'Do', value: 'Domingo'}];
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
  
  step:string = "0";
  secuencia:number;
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
  
  storeData()
  {
    const datosForm = {
      fechas_programacion_mensaje: {
        fecha_inicio: this.convertirFecha(this.fromDate),
        fecha_fin: this.convertirFecha(this.toDate)
      },
      dias_asociados: this.daysOfWeekVal,
      tipo_de_dias: this.tipo_de_dias,
      hora_tocado_inicio: this.convertirAHoraMilitar(this.timeStartList[0]),
      hora_tocado_fin: this.convertirAHoraMilitar(this.timeEndList[0]),
      secuencia: this.secuencia,
      mensaje_tipo_esquema: 2,
      /*
      tags: [
        {
            "id": 10
        },
        {
            "id": 13
        }
      ]*/
    };
    this.messageService.setMsgExterno(datosForm);
  }

  compararHoras(hora1: string, hora2: string): boolean {
    const formato12Horas = /(\d{1,2}):(\d{2}) ([AP]M)/; // Expresión regular para el formato "HH:mm AM/PM"
    
    // Obtener las horas, minutos y AM/PM de cada hora
    const [, horas1, minutos1, amPm1] = hora1.match(formato12Horas) || [];
    const [, horas2, minutos2, amPm2] = hora2.match(formato12Horas) || [];
  
    // Convertir las horas a formato de 24 horas
    const horas24h1 = amPm1 === 'PM' ? parseInt(horas1, 10) + 12 : parseInt(horas1, 10);
    const horas24h2 = amPm2 === 'PM' ? parseInt(horas2, 10) + 12 : parseInt(horas2, 10);
  
    // Comparar las horas
    if (horas24h1 > horas24h2) {
      return false; 
    } else if (horas24h1 < horas24h2) {
      return true; 
    } else {
      
      const minutos1Num = parseInt(minutos1, 10);
      const minutos2Num = parseInt(minutos2, 10);
  
      if (minutos1Num > minutos2Num) {
        return false; 
      } else if (minutos1Num < minutos2Num) {
        return true; 
      } else {
        return false; 
      }
    }
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

  convertirFecha(fechaString) {
    const fecha = new Date(fechaString);
  
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
  
    return `${dia}/${mes}/${año}`;
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

    
    this.scrollTop();
    
  }

  scrollTop()
  {
    const element = document.getElementById('topDiv');
    if (element) {
      element.scrollIntoView();
    }
  }
  setTimeStart() {
    let hour:any;
    let min:any;
    const timeString = this.timeStart.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    
    let res = `${timeString}`;
    
    if (this.timeStartList.includes(res))
    {
      alert("Ya fue agregado");
    }
    else
    {
      if (this.timeStartList.length === 0)
      {
        if (this.timeEndList.length > 0)
        {
          if (this.compararHoras(res, this.timeEndList[0]) === true)
          {
            this.timeStartList.push(res);
          }
        }
        else {
          this.timeStartList.push(res);
        }
        
      }
    }
    
  }
  
  removeTime33(index: number) {
    this.timeList3.splice(index, 1);
  }
  removeTimeStart(index: number) {
    this.timeStartList.splice(index, 1);
  }
  
  setTimeEnd() {
    let hour:any;
    let min:any;
    const timeString = this.timeEnd.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    
    let res = `${timeString}`;
    
    if (this.timeEndList.includes(res))
    {
      alert("Ya fue agregado");
    }
    else
    {
      if(this.timeEndList.length === 0)
      {
        if (this.timeStartList.length > 0)
        {
          if (this.compararHoras(this.timeStartList[0], res) === true)
          {
            this.timeEndList.push(res);
          }
        }
        else {
          this.timeEndList.push(res);
        }
        
        
      }
    }
    
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
