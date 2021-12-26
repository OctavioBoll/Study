import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  regForm = new FormGroup({
    emailReg: new FormControl(''),
    passwordReg: new FormControl('')
  })

  escena = false;

  constructor(
    private router: Router,
    private authSvc:AuthService
  ) { }

  ngOnInit(): void {
  }


  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user) {
        //redirect to home
        this.router.navigate(['/misMaterias']);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  cambiarEscena(){
    this.escena =! this.escena;
    
  }

  async onRegister(){
    const {email,password} = this.regForm.value;
    try{
      const user = await this.authSvc.registrer(email,password);
      if(user){
        this.router.navigate(['/misMaterias']);
      }
    }
    catch(er){
      console.log(er)
    }
  }
}
