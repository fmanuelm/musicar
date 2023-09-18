import { Component, OnInit } from '@angular/core';
import { UsersavailabilityService } from '../usersavailability.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public usuarios:any[]=[];
  constructor(private userAvability: UsersavailabilityService, private router: Router) { }

  ngOnInit(): void {
    this.getUsuariosDisponibilidad();
  }

  getUsuariosDisponibilidad()
  {
    this.userAvability.getUsuariosDisponibilidad().subscribe(resp=>{
      this.usuarios = resp;
    });
  }
  getUsuariosById()
  {
    
  }
  exportExcel()
  {
    this.userAvability.exportExcel(this.usuarios);
  }
  exportPdf()
  {
    let cols = [
      { field: 'nombres', header: 'Nombres' },
      { field: 'apellidos', header: 'Apellidos' },
      { field: 'pais', header: 'País' },
      { field: 'cliente', header: 'Nit' },
      { field: 'tipo_usuario', header: 'Tipo Usuario' },
    ];
    this.userAvability.exportPdf(this.usuarios, cols);
  }
  viewUserAvailability(id)
  {
    this.router.navigate(['disponibilidad-usuario/detail', id]);
  }
}
