import { Component, OnInit } from '@angular/core';
import { BranchFacilityService } from '../service/branch-facility.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public branchFacilities: any[];
  public cols = [
    { field: 'nombre', header: 'Sucursal' },
    { field: 'alias', header: 'Nombre comercial' },
    { field: 'pais', header: 'País' },
    { field: 'cliente', header: 'Cliente' },
  ];
  constructor(private branchFacilityService: BranchFacilityService, private router: Router) { }

  ngOnInit(): void {
    this.getBranchFacility()
  }

  getBranchFacility() {
    this.branchFacilityService.getBranchsFacility().subscribe(resp => {
      this.branchFacilities = resp;
      console.log(resp);

    })
  }

  viewBranchFacility(id) {
    this.router.navigate(
      ['sucursal-instalacion/detail', id]
    );
  }

  exportExcel() {
    this.branchFacilityService.exportExcel(this.branchFacilities);
  }

  exportPdf() {
    this.branchFacilityService.exportPdf(this.branchFacilities, this.cols);
  }

}
