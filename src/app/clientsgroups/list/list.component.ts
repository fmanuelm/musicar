import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesgruposService } from '../service/clientesgrupos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private router: Router, private clientesgrupos:ClientesgruposService) { }
  clientsgroups:any[]=[];
  public cols = [
    { field: 'id', header: 'Id' },
    { field: 'nombre', header: 'Grupo Cliente' },
  ];

  ngOnInit(): void {
    this.getClientesGrupos();
  }

  getClientesGrupos()
  {
    this.clientesgrupos.getClientesgrupos().subscribe((resp)=>{
      this.clientsgroups = resp;
    });
  }
  exportExcel()
  {
    this.clientesgrupos.exportExcel(this.clientsgroups);
  }
  exportPdf()
  {
    this.clientesgrupos.exportPdf(this.clientsgroups, this.cols);
  }
  viewClientGroup(id: number)
  {
    //alert(id);
    
    this.router.navigate(
      ['clientes-grupos/detail', id]
    );
    
  }
}
