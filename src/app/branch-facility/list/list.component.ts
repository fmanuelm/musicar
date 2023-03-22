import { Component, OnInit } from '@angular/core';
import { BranchFacilityService } from '../service/branch-facility.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public branchFacilities: any[];
  public cols = [
    { field: 'nombre', header: 'Sucursal' },
    { field: 'alias', header: 'Nombre comercial' },
    { field: 'cliente', header: 'Cliente' },
    { field: 'pais', header: 'País' },
  ];
  constructor(private branchFacility: BranchFacilityService) { }

  ngOnInit(): void {
    this.getBranchFacility()
  }

  getBranchFacility() {
    this.branchFacility.getBranchsFacility().subscribe(resp => {
      this.branchFacilities = resp;
      console.log(resp);

    })
  }

  exportExcel() {
    this.branchFacility.exportExcel(this.branchFacilities);
  }

  exportPdf() {
    this.branchFacility.exportPdf(this.branchFacilities, this.cols);
  }

}
