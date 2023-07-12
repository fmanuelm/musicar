import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';
import { Externo } from '../../interfaces/externo';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';

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
    { field: 'punto', header: 'Punto' },
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
