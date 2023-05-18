import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PointsGroupsService } from '../service/points-groups.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public pointsGroups: any[];
  public cols = [
    { field: 'nombre', header: 'Grupo' },
    { field: 'paisValue', header: 'País' },
    { field: 'nitValue', header: 'NIT' },
    { field: 'clienteValue', header: 'Cliente' },
  ];
  constructor(private pointsGroupsService: PointsGroupsService, private router: Router) { }

  ngOnInit(): void {
    this.getPointsGroups()
  }

  getPointsGroups() {
    this.pointsGroupsService.getPointsGroups().subscribe(resp => {
      this.pointsGroups = resp;
    })
  }

  viewPointGroup(id) {
    this.router.navigate(
      ['grupos-puntos/detail', id]
    );
  }

  exportExcel() {
    this.pointsGroupsService.exportExcel(this.pointsGroups);
  }

  exportPdf() {
    this.pointsGroupsService.exportPdf(this.pointsGroups, this.cols);
  }

}
