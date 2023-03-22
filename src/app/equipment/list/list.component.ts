import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../service/equipment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public equiments: any[];
  public cols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'alias', header: 'Tipo equipo' },
    { field: 'cliente', header: 'Placa' },
    { field: 'pais', header: 'MAC' },
    { field: 'pais', header: 'Punto' },
  ];
  constructor(private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.getBranchFacility()
  }

  getBranchFacility() {
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
