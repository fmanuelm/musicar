import { Component, OnInit } from '@angular/core';
import { PointService } from '../service/point.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public points: any[];
  public cols = [
    { field: 'id', header: 'Puntos' },
    { field: 'pais', header: 'País' },
    { field: 'cliente', header: 'Cliente' },
    { field: 'sucursal', header: 'Sucursal de instalación' },
  ];
  constructor(private pointService: PointService, private router: Router) { }

  ngOnInit(): void {
    this.getBranchFacility()
  }

  getBranchFacility() {
    this.pointService.getPoints().subscribe(resp => {
      this.points = resp;
      console.log('puntos', resp);
    })
  }

  viewPoint(idPoint) {
    this.router.navigate(
      ['puntos/detail', idPoint]
    );
  }

  exportExcel() {
    this.pointService.exportExcel(this.points);
  }

  exportPdf() {
    this.pointService.exportPdf(this.points, this.cols);
  }

}
