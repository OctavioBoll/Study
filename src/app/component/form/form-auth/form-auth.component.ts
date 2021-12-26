import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app'


@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.css']
})
export class FormAuthComponent implements OnInit {

  @Input() action:string;

  private validEmail = /\S+@\S+\.\S+/;

  formsLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.validEmail)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(6)])

  });
  
  constructor(
    public auth_:AngularFireAuth,
    private router:Router,

  ) { }

  ngOnInit(): void {
    
  }

  loginWithGoogle(){
    this.auth_.signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }



  customLogin(){
    this.auth_.signInWithEmailAndPassword(this.formsLogin.value.email, this.formsLogin.value.pass)
    .then(res => {
      this.router.navigate(['/Profile']);
    })
    .catch(err => console.log('Error cl:',err));
  }

  resgistrer(){
    this.auth_.createUserWithEmailAndPassword(this.formsLogin.value.email,this.formsLogin.value.pass)
    .then(user =>{
      this.router.navigate(['/Profile']);
    })
    .catch(err => console.log("error usuario: ",err));
  }

  getErrorMessage(field:string){
    let message;
    if(this.formsLogin.get(field).errors.required){
      message = "Ingrese el dato correspondiente."
    }else if(this.formsLogin.get(field).hasError('pattern')){
      message = "el email no es valido.";
    }

      else if(this.formsLogin.get(field).hasError('minlength')){
        message = "ingrese como minimo 6 o mas caracteres";
      
      }
    return message;
  }
  

  isValidField(field:string):boolean{
    return ((this.formsLogin.get(field).touched || this.formsLogin.get(field).dirty) && !this.formsLogin.get(field).valid);
  }


}
