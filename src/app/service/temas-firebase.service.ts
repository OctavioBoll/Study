import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class TemasFirebaseService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getTemas(){
    return this.firestore.collection("temas").snapshotChanges();
  }

  
  createTemas(tema:any){
    return this.firestore.collection("temas").add(tema);
  }

  updateTemas(id:any,tema:any){
    return this.firestore.collection("temas").doc(id).update(tema);
  }

  deleteTemas(id:any){
    return this.firestore.collection("temas").doc(id).delete();
  }
}
