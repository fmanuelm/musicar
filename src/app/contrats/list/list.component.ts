import { Component, OnInit } from '@angular/core';
import { ContratsService } from '../service/contrats.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public contrats: any[];
  public cols = [
    { field: 'codigo_contrato', header: 'Contrato' },
    { field: 'estado', header: 'Estado' },
    { field: 'cliente', header: 'Cliente' },
    { field: 'sucursal', header: 'Sucursal instalación' },
    { field: 'sublinea', header: 'Sublínea' },
  ];
  constructor(private contractsService: ContratsService, private router: Router) { }

  ngOnInit(): void {
    this.getContracts()
  }

  getContracts() {
    this.contractsService.getContrats().subscribe(resp => {
      this.contrats = resp;
    })
  }

  viewContract(id) {
    this.router.navigate(
      ['contratos/detail', id]
    );
  }

  exportExcel() {
    this.contractsService.exportExcel(this.contrats);
  }

  exportPdf() {
    this.contractsService.exportPdf(this.contrats, this.cols);
  }

}
