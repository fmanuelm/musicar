import { Component, OnInit } from '@angular/core';
import { PointsGroupsService } from '../service/points-groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

  idPointGroup: any;
  pointsGroups: any;
  points: any[];
  constructor(private pointsGroupsService: PointsGroupsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idPointGroup = this.route.snapshot.paramMap.get('id');
    this.getPointGroupById(this.idPointGroup);
  }

  getPointGroupById(id) {
    this.pointsGroupsService.getPointsGroupsById(id).subscribe(resp => {
      this.pointsGroups = resp;
      this.points = resp.puntos_asociados;
      this.points = this.points.map(p => ({
        id: p.puntos.id,
        sucursal: p.puntos.contratos[0].contrato.sucursal_instalacion.nombre,
        sublinea: p.puntos.contratos[0].contrato.negocio_sublineas.codigo_sublineas,
        contrato: p.puntos.contratos[0].contrato.codigo_contrato,
      }));
    })
  }

  deletePointGroup() {
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
        this.pointsGroupsService.deletePointsGroupsById(this.idPointGroup).subscribe(resp => {
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
              ['grupos-puntos/list',]
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

  editPointGroup() {
    this.router.navigate(
      ['grupos-puntos/edit', this.idPointGroup]
    );
  }

}
