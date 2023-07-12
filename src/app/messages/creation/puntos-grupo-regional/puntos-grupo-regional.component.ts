import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';
import { SortEvent } from 'primeng/api';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-puntos-grupo-regional',
  templateUrl: './puntos-grupo-regional.component.html',
  styleUrls: ['./puntos-grupo-regional.component.css']
})
export class PuntosGrupoRegionalComponent implements OnInit {

  constructor(private messageService: MessageService) { }
  
  groups: any[] = [];
  regionals: any[] = [];
  public points: any[];
  selectedGroups: any | null = null;
  selectedRegions: any | null = null;
  puntoSelect: any | null = null;
  accordionTabsData2: any[] = [];
  accordionTabsData3: any[] = [];
  puntos: any[] = [];
  filterText: any = "";
  pointsFilter:any;
  public colsPuntos = [
    { field: 'id', header: ''},
    { field: 'punto', header: 'Punto' },
    { field: 'sucursal', header: 'Sucursal' },
    { field: 'regional', header: 'Regional' },
  ];
  

  ngOnInit(): void {
    this.getPoints();
    //this.getGroups();
    //this.getRegionals();
    this.scrollTop();
    this.getGroupsPoints();
    this.getRegionesPoints();
  }
  filterData() {
    this.pointsFilter = this.points.filter(item =>
      item.contratos[0].contrato.sucursal_instalacion.nombre.toLowerCase().includes(this.filterText.toLowerCase()) ||
      item.contratos[0].contrato.sucursal_instalacion.regionales_ciudades.regionales.nombre.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
  filterDataGroup(filterText:string, id:any) {
    this.accordionTabsData2[id].tableDataFilter = this.accordionTabsData2[id].tableData.filter(item =>
      item.puntos.contratos[0].contrato.sucursal_instalacion.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.puntos.id.toString().includes(filterText.toLowerCase()));
  }
  filterDataRegiones(filterText:string, id:any) {
    this.accordionTabsData3[id].tableDataFilter = this.accordionTabsData3[id].tableData.filter(item =>
      item.puntos.contratos[0].contrato.sucursal_instalacion.nombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.puntos.id.toString().includes(filterText.toLowerCase()));
  }
  getGroupsPoints()
  {
    this.messageService.getGroupsPoints().subscribe(resp => {
      console.log("grupos puntos: ");
      console.log(resp);
      this.accordionTabsData2 = resp;
      this.accordionTabsData2.forEach(obj => {
        obj.tableDataFilter = obj.tableData;
      });
      console.log("filtrado:");
      console.log(this.accordionTabsData2);
    });
    
    
  }
  getRegionesPoints()
  {
    this.messageService.getRegionesPoints().subscribe(resp => {
      console.dir(resp);
      this.accordionTabsData3 = resp;
      this.accordionTabsData3.forEach(obj => {
        obj.tableDataFilter = obj.tableData;
      });
    });

  }
  scrollTop()
  {
    const element = document.getElementById('topDiv');
    if (element) {
      element.scrollIntoView();
    }
  }
  getPoints()
  {
    this.messageService.getPoints().subscribe(resp => {
      console.dir(resp);
      this.points = resp;
      this.pointsFilter = resp;
    });
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
    
    this.puntoSelect.map(curValue=>{
      this.puntos.push(curValue.id);
    });

    this.selectedGroups.map(curValue=>{
      this.puntos.push(curValue.puntos.id);
    });
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
  
}
