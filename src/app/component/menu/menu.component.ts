import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[AuthService],
})
export class MenuComponent {

  valorCheck = true;
  constructor(
    private authSvc:AuthService,
    private router:Router,
    public auth:AngularFireAuth
  ) { }

  sidebarVisible(){
    this.valorCheck =! this.valorCheck
    console.log(this.valorCheck);
  }

  logout(){
    this.auth.signOut();
    this.router.navigate(['/inicio']);
  }

  
 

}
