import { Component, OnInit } from '@angular/core';
import { ContratsService } from '../service/contrats.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public contrats: any[];
  public cols = [
    { field: 'razon_social', header: 'Contrato' },
    { field: 'razon_comercial', header: 'Estado' },
    { field: 'razon_comercial', header: 'Sucursal instalación' },
    { field: 'nit', header: 'Cliente' },
    { field: 'pais_nombre', header: 'Sublínea' },
  ];
  constructor(private contractsService: ContratsService) { }

  ngOnInit(): void {
    this.getContracts()
  }

  getContracts() {
    this.contractsService.getContrats().subscribe(resp => {
      console.log(resp);

      this.contrats = resp;
    })
  }

}
