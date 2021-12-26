import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(public afAuth:AngularFireAuth) { }



  async login(email:string, password: string){
    try{
      const result= await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    }
    catch(er){
      console.log(er);
    } 
   }
  

  async registrer( email:string,password:string){
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(email,password);
      return result;
    }
    catch(er){
      console.log(er);
    }
  }


  async logout(){
    try{
      await this.afAuth.signOut();
    }
    catch(er){
      console.log(er)
    }
  }

  
  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
