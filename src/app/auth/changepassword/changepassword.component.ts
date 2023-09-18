import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor() { }
  private email: string = 'fmanuelm@hotmail.com';
  ngOnInit(): void {
  }

  submitHandle()
  {
    swal.fire({
      title: 'Confirmación.',
      text: `Hola, hemos enviado un correo electrónico a ${this.email} con un enlace para que realices el cambio de tu contraseña.`,
      buttonsStyling: false,
      showCloseButton: true,
      customClass: {
        popup: 'recovery_password_modal',
        confirmButton: "btn bg-btn1",
      },
      confirmButtonText: 'Iniciar sesión',
      color: '#fff',
      background: 'linear-gradient(90deg, rgba(31,90,132,1) 0%, rgba(31,90,132,1) 31%, rgba(86,167,214,1) 96%)'
    });
  }
}
