import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClientsService } from '../service/clients.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from '../interfaces/Client.interface';

@Component({
  selector: 'app-data-table-cmp',
  templateUrl: 'datatable.component.html'
})

export class DataTableComponent implements OnInit {

  constructor(private clientService: ClientsService, private router: Router) { }

  public clients: any[];
  public first: number = 0;
  public exportColumns: any[];


  public cols = [
    { field: 'razon_social', header: 'Razón social' },
    { field: 'razon_comercial', header: 'Razón comercial' },
    { field: 'nit', header: 'NIT' },
    { field: 'tCliente', header: 'Tipo cliente' },
    { field: 'pais', header: 'País' },
  ];

  ngOnInit() {
    this.getClients()
    // this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }


  getClients() {
    this.clientService.getClients().subscribe(resp => {
      console.log(resp);
      
      this.clients = resp;
    })
  }

  viewClient(id) {
    this.router.navigate(
      ['clientes/datail', id]
    );
  }

  exportExcel() {
    this.clientService.exportExcel(this.clients);
  }

  exportPdf() {
    this.clientService.exportPdf(this.clients, this.cols);
  }



}
