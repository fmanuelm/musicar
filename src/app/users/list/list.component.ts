import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  public users: any[];
  public cols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'apellido', header: 'Apellidos' },
    { field: 'paisValue', header: 'País' },
    { field: 'cliente', header: 'Cliente' },
    { field: 'tUsuarioValue', header: 'Tipo usuario' },
  ];
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.usersService.getUsers().subscribe(resp => {
      this.users = resp;
      console.log(resp);
    })
  }

  viewUser(id) {
    this.router.navigate(
      ['usuarios/detail', id]
    );
  }

  exportExcel() {
    this.usersService.exportExcel(this.users);
  }

  exportPdf() {
    this.usersService.exportPdf(this.users, this.cols);
  }

}
