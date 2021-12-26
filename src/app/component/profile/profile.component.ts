import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 

  formsName = new FormGroup({
    name: new FormControl('')

  });

  constructor( public auth:AngularFireAuth) { }

  ngOnInit(): void {
  }


  editar(){
    const user = firebase.auth().currentUser.updateProfile({
      displayName:this.formsName.value.name
    });
    
  }
}
