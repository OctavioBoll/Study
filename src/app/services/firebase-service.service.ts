import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  getMaterias(){
    return this.firestore.collection("materias").snapshotChanges();
  }

  createMateria(materia:any){
    return this.firestore.collection("materias").add(materia);
  }

  updateMateria(id:any,materia:any){
    return this.firestore.collection("materias").doc(id).update(materia);
  }

  deleteMateria(id:any){
    return this.firestore.collection("materias").doc(id).delete();

  }
}
