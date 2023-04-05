import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BranchFacility } from '../interfaces/Branch-facility.interface';
import { BranchFacilityService } from '../service/branch-facility.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private branchFacilityService: BranchFacilityService,
    private router: Router) { }
    
  idBranchFacility: any;
  branchFacility: any;


  async ngOnInit() {
    this.idBranchFacility = this.route.snapshot.paramMap.get('id');
    await this.getBranchFacilityById(this.idBranchFacility);
  }


  getBranchFacilityById(id) {
    this.branchFacilityService.getBranchsFacilityById(id).subscribe(resp => {
      this.branchFacility = resp;
    })
  }

  deleteBranchFacility() {
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
        this.branchFacilityService.deleteBranchFacility(this.idBranchFacility).subscribe(resp => {
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
              ['sucursal-instalacion/list',]
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

  editBranchFacility() {
    this.router.navigate(
      ['sucursal-instalacion/edit', this.idBranchFacility]
    );
  }
}
