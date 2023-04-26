import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from '../service/users.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router) { }
  public idUser: any;
  public user: any;

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id');
    this.getUserById(this.idUser);
  }

  getUserById(id) {
    this.usersService.getUserById(id).subscribe(resp => {
      this.user = resp;
    });
  }

  editUser() {
    this.router.navigate(
      ['usuarios/edit', this.idUser]
    );
  }

  deleteUser() {
    swal.fire({
      title: 'Alerta',
      text: "¿Confirma que desea realizar la eliminación del registro?",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Aceptar',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.usersService.deleteUser(this.idUser).subscribe(resp => {
          if (resp.status == 200) {
            swal.fire(
              {
                title: 'Confirmación',
                text: 'El regitro se elimino de manera correcta.',
                icon: 'success',
                customClass: {
                  confirmButton: "btn btn-success",
                },
                buttonsStyling: false
              }
            )
            this.router.navigate(
              ['usuarios/list',]
            );
          } else {
            swal.fire(
              {
                title: 'Error',
                text: resp.message,
                icon: 'error',
                customClass: {
                  confirmButton: "btn btn-success",
                },
                buttonsStyling: false
              }
            )
          }
        });
      }
    })
  }

}
