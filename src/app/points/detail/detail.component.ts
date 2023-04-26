import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PointService } from '../service/point.service';
import swal from 'sweetalert2';
declare var $: any;



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  idPoint: string;
  point: any[];
  contratInfo: any;


  public cols = [
    { field: 'id', header: 'Contrato' },
    { field: 'pais', header: 'Estado contrato' },
    { field: 'cliente', header: 'Sublínea' },
    { field: 'sucursal', header: 'Ver contrato' },
  ];

  constructor(private route: ActivatedRoute,
    private pointService: PointService,
    public router: Router) { }

  ngOnInit(): void {
    this.idPoint = this.route.snapshot.paramMap.get('id');
    this.getPointById(this.idPoint);
  }

  getPointById(idPoint) {
    this.pointService.getPointById(idPoint).subscribe(resp => {
      this.point = resp;
      this.contratInfo = resp.contratos[0].contrato;
    })
  }


  editPoint() {
    this.router.navigate(
      ['puntos/edit', this.idPoint]
    );
  }


  deletePoint() {
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
        this.pointService.deletePoint(this.idPoint).subscribe(resp => {
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
              ['puntos/list',]
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
