import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  email: string = '';
  password: string = '';
  loginError:boolean = false;
  userVacio:boolean = false;
  passVacio:boolean = false;
  showPass:string = "password";
  ngOnInit(): void {
    console.log(localStorage.getItem("token"));
  }

  handleLogin()
  {
    
    if(this.email === '')
    {
      this.userVacio = true;
      this.loginError = false;
      return ;
    }
    if(this.password === '')
    {
      this.userVacio = false;
      this.passVacio = true;
      this.loginError = false;
      return ;
    }
    this.passVacio = false;
    this.auth.login(this.email, this.password).subscribe(resp=>{
      let response = resp;
      console.log(response);
      if (resp.status !== 202)
      {
        this.loginError = true;
      }
      else 
      {
        localStorage.setItem("token", resp.token.bearer);
        // redirigir al dashboard
        localStorage.setItem('token', response.token.bearer);
        let id = this.obtenerDespuesDeI(response.token.uid);
        localStorage.setItem('id', id);
        console.log(id);
        //alert("login");
        this.router.navigate(['/dashboard']);
      }
    });
    
  }

  obtenerDespuesDeI(cadena) {
    
    const posicionI = cadena.indexOf('I');
  
    if (posicionI !== -1) {  
      return cadena.slice(posicionI + 1);
    } else {
      return "No se encontró la letra 'I' en la cadena.";
    }
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
}
