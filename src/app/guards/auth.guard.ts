import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {take, switchMap} from 'rxjs/internal/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth:AngularFireAuth){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.auth.authState.pipe(
      take(1),
      switchMap(async (authState)=>{
        if(authState){
          return true
        }else{
          console.log('no autenticado')
          return false
        }
      })

    );
    
  }
  
}
