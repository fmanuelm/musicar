import { Component, OnInit } from '@angular/core';
import { PointService } from '../service/point.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',  
})
export class ListComponent implements OnInit {

  public points: any[];
  public cols = [
    { field: 'nombre', header: 'Puntos' },
    { field: 'alias', header: 'País' },
    { field: 'cliente', header: 'Cliente' },    
    { field: 'pais', header: 'Sucursal de instalación' },
  ];
  constructor(private pointService: PointService) { }

  ngOnInit(): void {
    this.getBranchFacility()
  }

  getBranchFacility() {
    this.pointService.getPoints().subscribe(resp => {
      this.points = resp;
      console.log(resp);
    })
  }

  exportExcel() {
    this.pointService.exportExcel(this.points);
  }

  exportPdf() {
    this.pointService.exportPdf(this.points, this.cols);
  }

}
