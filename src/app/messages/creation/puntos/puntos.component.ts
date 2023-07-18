import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';
import { Externo } from '../../interfaces/externo';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';
import { SortEvent } from 'primeng/api';
@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.css']
})
export class PuntosComponent implements OnInit {
  public points: any[];
  public cosa:string = "tableBranchFacility";
  public cols = [
    { field: 'id', header: ''},
    { field: 'puntos.id', header: 'Punto' },
    { field: 'sucursal', header: 'Sucursal' },
    { field: 'regional', header: 'Regional' },
  ];
  public puntoSelect: number | null = null;
  constructor(private messageService: MessageService) {

  }
  
  ngOnInit(): void {
    
    this.scrollTop();
    this.getPuntos();
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
  store()
  {
    
    this.messageService.storeMensaje().subscribe(resp=>{
      
    });
  }

  storeData()
  {
    let puntos = [];
    //alert(this.puntoSelect);
    puntos.push(this.puntoSelect);
    
    
    const datosForm = {
      puntos_asociados: puntos,
      //categoria_mensaje: 1,
    };
    
    this.messageService.setMsgExterno(datosForm);
  }

  getPuntos() {
    this.messageService.getPoints().subscribe(resp => {
      this.points = resp;
    });
    
  }
  
}
