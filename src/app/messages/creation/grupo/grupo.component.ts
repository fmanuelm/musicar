import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SortEvent } from 'primeng/api';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  groups: any[] = [];
  selectedGroups: any = [];
  accordionTabsData: any[] = [];
  puntos_order: any = 'ASC';  
  puntos:any[] = [];
  datosEjemp:any[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
   
   //this.getGroups();
   this.getGroupsPoints();
   this.scrollTop();
   this.datosEjemp = [
    {id: 1, punto: "punto 1", punto1: 1, sucursal: "sucursal 1", sucursal1: "sucursal 1", nivel1: {nivel2: { nivel3: 1 }}},
    {id: 2, punto: "punto 2", punto1: 2, sucursal: "sucursal 2", sucursal1: "sucursal 2", nivel1: {nivel2: { nivel3: 2 }}},
    {id: 3, punto: "punto 3", punto1: 3, sucursal: "sucursal 3", sucursal1: "sucursal 3", nivel1: {nivel2: { nivel3: 3 }}},
    {id: 4, punto: "punto 4", punto1: 4, sucursal: "sucursal 4", sucursal1: "sucursal 4", nivel1: {nivel2: { nivel3: 4 }}}
   ];
  }
  scrollTop()
  {
    const element = document.getElementById('topDiv');
    if (element) {
      element.scrollIntoView();
    }
  }
  getGroupsPoints()
  {
    this.messageService.getGroupsPoints().subscribe(resp => {
      console.log(resp);
      this.accordionTabsData = resp;
      this.accordionTabsData.forEach(obj => {
        obj.tableDataFilter = obj.tableData;
      });
    });
  }
  getGroups()
  {
    this.messageService.getGroupsClient().subscribe(resp => {
      console.dir(resp);
      this.groups = resp;
    });
  }

  orderGroupAscDesc(field:string, id_table:number)
  {
    if (field === 'puntos')
    {
      this.accordionTabsData[id_table].tableDataFilter.sort((a, b)=> b.puntos.id - a.puntos.id);
      this.accordionTabsData[id_table].tableData.sort((a, b)=> b.puntos.id - a.puntos.id);
      console.log(this.accordionTabsData[id_table].tableDataFilter);
      if (this.puntos_order === 'ASC')
      {
        /*
        this.accordionTabsData[id_table].tableDataFilter.sort((a, b)=> b.puntos.id - a.puntos.id);
        this.puntos_order = 'DESC';
        console.log(this.puntos_order);
        console.log(this.accordionTabsData[id_table].tableDataFilter);*/
      }
      else 
      {
        /*
        this.accordionTabsData[id_table].tableDataFilter.sort((a, b)=> a.puntos.id - b.puntos.id);
        this.puntos_order = 'ASC';
        console.log(this.puntos_order);
        console.log(this.accordionTabsData[id_table].tableDataFilter);
        */
      }
      
    }
    if (field === 'sucursal')
    {

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
  filterDataGroup(filterText:string, id:any) {
    this.accordionTabsData[id].tableDataFilter = this.accordionTabsData[id].tableData.filter(item =>
      item.puntos.contratos[0].contrato.sucursal_instalacion.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.puntos.id.toString().includes(filterText.toLowerCase()));
    }
  ordena()
  {
    alert();
  }
  storeData()
  {
    //puntos.push(this.puntoSelect);
    this.selectedGroups.map(curValue=>{
      this.puntos.push(curValue.puntos.id);
    });
    console.log(this.puntos);
    const datosForm = {
      puntos_asociados: this.puntos,
      //categoria_mensaje: 2,
    };
    this.messageService.setMsgExterno(datosForm);
  }
  selectOne(index: number)
  {
    alert(index);
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
  next2()
  {
    this.messageService.setStep("resumen2");
  }
}
