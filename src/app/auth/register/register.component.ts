import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router'
import swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public sectoresEconomicos:any[] = [];
  public paises:any[]=[];
  public regiones:any[]=[];
  public ciudades:any[]=[];
  public negocios_lineas:any[]=[];
  
  public showPass:string = "password";
  public password: string;
  public aceptoCondicion: boolean = false;

  
  formRegistro: FormGroup;
  constructor(private router:Router, private authService: AuthService, private _formBuilder: FormBuilder) {

  }
  

  ngOnInit(): void {
    
    this.getSector();    
    this.getPaises();
    this.getNegocioLineas();
    //this.selectedNegocioLinea = 0;

    this.formRegistro = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      correo: [null, [Validators.required, Validators.email]],
      telefono: [null, [Validators.required]],
      usuario: [null, [Validators.required]],
      password: [null, [Validators.required]],
      empresa: [null, [Validators.required]],
      no_empresa: [null, [Validators.required]],
      selectedSector: [0],
      selectedNegocioLinea: [0],
      selectedPais: [0],
      selectedRegion: [0],
      selectedCiudad: [0]
    });
  }
  soloNumeros(event: any) {
    const input = event.target.value;
    const soloNumeros = input.replace(/[^0-9]/g, ''); // Elimina todo excepto números
    this.formRegistro.controls['telefono'].setValue(soloNumeros); // Actualiza el valor del control del formulario
  }
  seleccionRequerida(control: AbstractControl): { [key: string]: any } | null {
    if (control.value === 0) {
      return { 'seleccionRequerida': true };
    }
    return null;
  }
  crearCuenta()
  {
    if (this.formRegistro.get('selectedSector').value === 0) {
      this.formRegistro.get('selectedSector').setErrors({ 'seleccionRequerida': true });
    }
    if (this.formRegistro.get('selectedNegocioLinea').value === 0) {
      this.formRegistro.get('selectedNegocioLinea').setErrors({ 'seleccionRequerida': true });
    }
    if (this.formRegistro.get('selectedPais').value === 0) {
      this.formRegistro.get('selectedPais').setErrors({ 'seleccionRequerida': true });
    }
    if (this.formRegistro.get('selectedRegion').value === 0) {
      this.formRegistro.get('selectedRegion').setErrors({ 'seleccionRequerida': true });
    }
    if (this.formRegistro.get('selectedCiudad').value === 0) {
      this.formRegistro.get('selectedCiudad').setErrors({ 'seleccionRequerida': true });
    }
    if (this.formRegistro.get('selectedCiudad').value === 0) {
      this.formRegistro.get('selectedCiudad').setErrors({ 'seleccionRequerida': true });
    }

    if (this.formRegistro.valid)
    {
      let nombre = this.formRegistro.get('nombre').value;
      let apellido = this.formRegistro.get('apellido').value;
      let correo = this.formRegistro.get('correo').value;
      let telefono = this.formRegistro.get('telefono').value;
      let usuario = this.formRegistro.get('usuario').value;
      let password = this.formRegistro.get('password').value;
      let razon_social = this.formRegistro.get('empresa').value;
      let nit = this.formRegistro.get('no_empresa').value;
      let pais = this.formRegistro.get('selectedPais').value;
      let negocio_sublinea = this.formRegistro.get('selectedNegocioLinea').value;
      let regionales_ciudades = this.formRegistro.get('selectedCiudad').value;
      let subgrupo_economico = this.formRegistro.get('selectedSector').value;
      
      
      this.authService.register(nombre,apellido,correo,telefono, 
        usuario,password,razon_social,nit,pais,subgrupo_economico,
        negocio_sublinea,regionales_ciudades).subscribe(resp=>{
          console.log(resp);
          if (resp.status === 201)
          {
            swal.fire(
              {
                title: 'Confirmación',
                text: resp.message,
                icon: 'success',
                customClass: {
                  confirmButton: "btn btn-success",
                },
                buttonsStyling: false
              }
            )
            this.router.navigate(['/auth/']);
          }
          else {
            if (resp.message.indexOf("correo") !== -1)
            {
              this.formRegistro.get('correo').setErrors({ 'correoExiste': true });
            }
            if (resp.message.indexOf("telefono") !== -1)
            {
              this.formRegistro.get('telefono').setErrors({ 'telefonoExiste': true });
            }
            if (resp.message.indexOf("usuario") !== -1)
            {
              this.formRegistro.get('usuario').setErrors({ 'usuarioExiste': true });
            }
            if (resp.message.indexOf("razon_social") !== -1)
            {
              this.formRegistro.get('empresa').setErrors({ 'razon_socialExiste': true });
            }
            if (resp.message.indexOf("nit") !== -1)
            {
              this.formRegistro.get('no_empresa').setErrors({ 'no_empresaExiste': true });
            }
            /*
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
            */
          }
        });
    }
    else {
      this.marcarCamposTocados(this.formRegistro);
    }
  }
  marcarCamposTocados(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.marcarCamposTocados(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  getSector()
  {
    this.authService.getSectorEconomico().subscribe((resp)=>{
      this.sectoresEconomicos = resp;
      console.log(this.sectoresEconomicos);
    });
  }
  getPaises()
  {
    this.authService.getPaises().subscribe(resp => {
      this.paises = resp;
      console.log(this.paises);
    });
  }
  setPais(id: number)
  {
    
    // las condicones para la regiones
    if (id !== 0)
    {
      this.authService.getRegiones(id).subscribe((resp)=>{
        console.log("regiones...");
        console.log(resp);
        if (resp.length > 0)
        {
          this.regiones = resp;
        }
        else
        {
          this.regiones = [];
        }
      });
    }
    else {
      this.regiones=[];
      this.ciudades=[];
    }
  }
  setRegion(id: number) {
    if (id !== 0)
    {
      this.authService.getCiudades(id).subscribe((resp)=> {
        if (resp.length > 0)
        {
          this.ciudades = resp;
        }
        else {
          this.ciudades = [];
        }
      });
    }
    else {
      this.ciudades=[];
    }
  }
  setSector(id: number)
  {

  }
  getNegocioLineas()
  {
    this.authService.getNegocioLinea().subscribe((resp)=>{
      this.negocios_lineas = resp;
    });
  }
  limpiarFormulario()
  {
    this.formRegistro.reset({
      nombre: null,
      apellido: null,
      correo: null,
      telefono: null,
      usuario: null,
      password: null,
      empresa: null,
      no_empresa: null,
      selectedSector: 0,
      selectedNegocioLinea: 0,
      selectedPais: 0,
      selectedRegion: 0,
      selectedCiudad: 0
    });
  }
  showPassword()
  {
    if (this.showPass === 'text')
    {
      this.showPass = "password";
    }
    else 
    {
      this.showPass = "text";
    }
    
  }
  aceptarCondicion() {
    this.aceptoCondicion = !this.aceptoCondicion;
  }
}
