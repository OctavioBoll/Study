import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class UnidadesFirebaseService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getUnidades(){
    return this.firestore.collection("unidades").snapshotChanges();
  }

  createUnidad(unidad:any){
    return this.firestore.collection("unidades").add(unidad);
  }

  updateUnidad(id:any,unidad:any){
    return this.firestore.collection("unidades").doc(id).update(unidad);
  }

  deleteUnidad(id:any){
    return this.firestore.collection("unidades").doc(id).delete();
  }
}
