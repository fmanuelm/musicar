import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EquipmentService } from '../service/equipment.service';
import swal from 'sweetalert2';
import { Client } from 'src/app/clients/interfaces/Client.interface';
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',

})
export class DetailComponent implements OnInit {
  branchFacility: any[];

  constructor(private route: ActivatedRoute,
    private equipmentService: EquipmentService,
    private router: Router) { }
  equipment: any;
  client: Client;
  idEquipment: any;
  branchFacilityValue: string;

  ngOnInit(): void {
    this.idEquipment = this.route.snapshot.paramMap.get('id');
    this.getEquipmentById(this.idEquipment);
  }

  getEquipmentById(id) {
    this.equipmentService.getEquipmentById(id).subscribe(resp => {
      this.equipment = resp;      
      this.getClientById(resp.puntos.contratos[0].cliente.id)


    })
  }

  getClientById(id) {
    this.equipmentService.getClientById(id).subscribe(resp => {
      this.client = resp;      
      this.getBranchFacilityByClient(this.client.id);
    })
  }

  getBranchFacilityByClient(idClient) {
    this.equipmentService.getBranchFacilityByClient(idClient).subscribe(resp => {
      if (resp.status) {
        this.branchFacility = [];
      } else {      
        this.branchFacility = resp;        
      }
    })
  }

  deleteEquipment() {
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
        this.equipmentService.deleteEquipment(this.idEquipment).subscribe(resp => {
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
              ['equipos/list',]
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

  editEquipment() {
    this.router.navigate(
      ['equipos/edit', this.idEquipment]
    );
  }

}
