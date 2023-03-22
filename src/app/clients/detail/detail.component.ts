import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from '../interfaces/Client.interface';
import { ClientsService } from '../service/clients.service';
import swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {


  public client: Client;
  public contacts: any;
  public countries: any;
  public openingHours: any;
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
    private router: Router) { }
  private idClient: any;
  ngOnInit(): void {
    this.idClient = this.route.snapshot.paramMap.get('id');
    this.getClienteById(this.idClient);
    this.getContactsByClient(this.idClient);
    this.getCountriesByClient(this.idClient);
    this.getOpeningHoursByClient(this.idClient);
  }

  getClienteById(id) {
    this.clientService.getClienteById(id).subscribe(resp => {
      this.client = resp;
    });
  }

  getContactsByClient(id) {
    this.clientService.getContactsByClient(id).subscribe(resp => {
      this.contacts = resp;
    });
  }

  getCountriesByClient(id) {
    this.clientService.getCountriesByClient(id).subscribe(resp => {
      this.countries = resp;
    });
  }

  getOpeningHoursByClient(id) {
    this.clientService.getOpeningHoursByClient(id).subscribe(resp => {
      this.openingHours = resp.horarios;
      console.log(this.openingHours);
    });
  }

  deleteClient() {
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
        this.clientService.deleteClient(this.idClient).subscribe(resp => {
          console.log(resp);
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
              ['clientes/',]
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

  editClient() {
    this.router.navigate(
      ['clientes/edit', this.idClient]
    );
  }

}
