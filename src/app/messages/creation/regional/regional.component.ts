import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { SortEvent } from 'primeng/api';
import { of } from 'rxjs';
import { MessageService } from '../../service/message.service';



@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css']
})
export class RegionalComponent implements OnInit {
  regionals: any[] = [];
  /*
  selectedGroups: {};
  selectedGroups: any = [];
  */
  selectedRegions: any = [];
  accordionTabsData: any[] = [];
  puntos:any[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    
    this.getRegionesPoints();
    this.scrollTop();
  }

  scrollTop()
  {
    const element = document.getElementById('topDiv');
    if (element) {
      element.scrollIntoView();
    }
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

  getRegionesPoints()
  {
    this.messageService.getRegionesPoints().subscribe(resp => {
      console.dir(resp);
      this.accordionTabsData = resp;
      this.accordionTabsData.forEach(obj => {
        obj.tableDataFilter = obj.tableData;
      });
    });
    
  }

  filterDataRegiones(filterText:string, id:any) {
    this.accordionTabsData[id].tableDataFilter = this.accordionTabsData[id].tableData.filter(item =>
      item.puntos.contratos[0].contrato.sucursal_instalacion.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.puntos.id.toString().includes(filterText.toLowerCase()));
  }
  next1()
  {
    this.storeData();
    
    this.messageService.storeMensaje().pipe(
      map(resp => {
        //alert("Perfecto " + resp.status);
        // Resto de la lógica
        if (resp.status == 200 || resp.status == 201) {
          this.messageService.setStep("resumen1");
        } else {
          console.log(resp);
          this.messageService.setStep("resumen2");
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        this.messageService.setStep("resumen2");
        return of(null);
        
      })
    ).subscribe();
    
  }
  storeData()
  {
    //puntos.push(this.puntoSelect);
    this.selectedRegions.map(curValue=>{
      this.puntos.push(curValue.puntos.id);
    });
    
    console.log(this.puntos);
    const datosForm = {
      puntos_asociados: this.puntos,
      //categoria_mensaje: 2,
    };

    this.messageService.setMsgExterno(datosForm);
  }
  next2()
  {
    this.messageService.setStep("resumen2");
  }
}
