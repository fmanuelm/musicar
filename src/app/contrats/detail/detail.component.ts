import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContratsService } from '../service/contrats.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private contratService: ContratsService) { }

  contract: any;
  idContarct: any
  async ngOnInit() {
    this.idContarct = this.route.snapshot.paramMap.get('id');
    await this.getContratById(this.idContarct);

  }

  getContratById(id) {
    this.contratService.getContratById(id).subscribe(resp => {
      this.contract = resp;
      console.log(this.contract);
    })
  }

  editContract() {
    this.router.navigate(
      ['contratos/edit', this.idContarct]
    );
  }


  deleteContract() {
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
        this.contratService.deleteContratById(this.idContarct).subscribe(resp => {
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
              ['contratos/list',]
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
