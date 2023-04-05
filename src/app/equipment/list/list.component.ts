import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../service/equipment.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public equiments: any[];
  public cols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'tEquipo', header: 'Tipo equipo' },
    { field: 'equipo_placa', header: 'Placa' },
    { field: 'MAC', header: 'MAC' },
    { field: 'punto', header: 'Punto' },
  ];
  constructor(private equipmentService: EquipmentService, private router: Router) { }

  ngOnInit(): void {
    this.getEquipments()
  }

  viewEquipment(idEquipment) {
    this.router.navigate(
      ['equipos/detail', idEquipment]
    );
  }

  getEquipments() {
    this.equipmentService.getEquipments().subscribe(resp => {
      this.equiments = resp;
      console.log(resp);
      
    })
  }

  exportExcel() {
    this.equipmentService.exportExcel(this.equiments);
  }

  exportPdf() {
    this.equipmentService.exportPdf(this.equiments, this.cols);
  }


}
