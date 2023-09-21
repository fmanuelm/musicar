import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  constructor() { }
  showPass:string = "password";
  showPass2:string = "password";
  ngOnInit(): void {
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

  showPassword2()
  {
    if (this.showPass2 === 'text')
    {
      this.showPass2 = "password";
    }
    else 
    {
      this.showPass2 = "text";
    }
    
  }
}
