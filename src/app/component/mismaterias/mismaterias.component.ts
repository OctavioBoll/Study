import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MateriaFirebaseService } from '../../service/materia-firebase.service';
import { UnidadesFirebaseService } from '../../service/unidades-firebase.service';
import { TemasFirebaseService } from '../../service/temas-firebase.service';
import { isNullOrUndefined } from 'util';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';



@Component({
  selector: 'app-mismaterias',
  templateUrl: './mismaterias.component.html',
  styleUrls: ['./mismaterias.component.css']
})

export class MismateriasComponent implements OnInit {

  confi: any;
  materias = { count: 10, data: [] };
  unidades = { count: 10, data: [] };
  temas = { count: 10, data: [] };

  uniXMat = [];
  temaXUni = [];

  contadorIdMaterias: number;
  contadorIdUnidades: number;
  contadorIdTemas: number;
  idMateriaDos: number;
  idUnidadDos: number;

  collection = { count: 10, data: [] };
  closeResult = '';
  mostrar = "M";
  titulo = "Materias"
  actualizar = false;


  materiaForm: FormGroup;
  unidadesForm: FormGroup;
  temasForm: FormGroup;

  idFirebaseActualizar: string;
  idFirebaseMateria: string;
  idFirebaseUnidad: string;
  idFirebaseTema: string;

  idUser:string;

  constructor(
    private modalService: NgbModal,

    public fbMat: FormBuilder,
    public fbUni: FormBuilder,
    public fbTema: FormBuilder,

    public auth:AngularFireAuth,

    private _firebaseService: MateriaFirebaseService,
    private _unidadesFirebaseService: UnidadesFirebaseService,
    private _temasFirebaseServices: TemasFirebaseService
  ) { }

  ngOnInit(): void {



    this.idFirebaseActualizar = '';
    this.idFirebaseMateria = '';
    this.idFirebaseUnidad = '';
    this.idFirebaseTema = '';
    
    this.idUser = firebase.auth().currentUser.uid;
    
    this.uniXMat = [];
    this.temaXUni = [];

    this.idMateriaDos = 0;
    this.idUnidadDos = 0;

    this.contadorIdMaterias = 0;

    this.confi = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.materias.count
    };

    console.log(this.idUser)

    /** Materias OnInit*/
    this.materiaForm = this.fbMat.group({
      idUs:[''],
      idMat: [''],
      nombre: ['']
    });

    /** Get Materias */

    this._firebaseService.getMaterias().subscribe(resp => { 
      this.materias.data = [];
       resp.forEach((e: any) => 
        {
          if (this.idUser == e.payload.doc.data().idUs) {
            this.materias.data.push({
              idUs: e.payload.doc.data().idUs,
              idMat: e.payload.doc.data().idMat,
              nombre: e.payload.doc.data().nombre,
              idFirebase: e.payload.doc.id})
          
          }})
        });
      

        
    


  /**
    this._firebaseService.getMaterias().subscribe(resp => { 
      this.materias.data = resp.map((e: any) => 
        {
          if (this.idUser == e.payload.doc.data().idUs) 
          {
          return {
            idUs: e.payload.doc.data().idUs,
            idMat: e.payload.doc.data().idMat,
            nombre: e.payload.doc.data().nombre,
            idFirebase: e.payload.doc.id
          }
        }
        else{
          return{
            idUs:null,
            idMat: null,
            nombre: null,
            idFirebase:null
            
          }
          
        }  
        
      })
    },
      error => {
        console.error(error);
      })


   */
   

    /** Unidades OnInit*/
    this.unidadesForm = this.fbUni.group({
      idUni: [''],
      idFamiliaMat: [''],
      nombre: ['']
    });

    /** Get Unidades */
    this._unidadesFirebaseService.getUnidades().subscribe(resp => {
      this.unidades.data = resp.map((e: any) => {
        return {
          idUni: e.payload.doc.data().idUni,
          idFamiliaMat: e.payload.doc.data().idFamiliaMat,
          nombre: e.payload.doc.data().nombre,
          idUniFirebase: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      })


    /** Temas OnInit */
    this.temasForm = this.fbUni.group({
      idTema: [''],
      idFamiliaUni: [''],
      nombre: [''],
      nota: ['']
    });

    /** Get Temas */
    this._temasFirebaseServices.getTemas().subscribe(resp => {
      this.temas.data = resp.map((e: any) => {
        return {
          idTema: e.payload.doc.data().idTema,
          idFamiliaUni: e.payload.doc.data().idFamiliaUni,
          nombre: e.payload.doc.data().nombre,
          nota: e.payload.doc.data().nota,
          idFirebaseTema: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      })

  }


  /** Contadores */
  contarMaterias(){
    this.contadorIdMaterias = this.materias.data.length + 1;
  };

  contarUnidades(){
   this.contadorIdUnidades = this.unidades.data.length + 1;
  };

  contarTemas(){
   this.contadorIdTemas = this.temas.data.length + 1;
  };

/** Cambiar Vistas */
 cambiarVista(idMateria) {
   
  
   this.temaXUni = [] ;
   this.uniXMat = [] ; 
   
   this.idMateriaDos = idMateria;
   
   this.unidades.data.forEach(e => {
     if(idMateria === e.idFamiliaMat){
       this.uniXMat.push(e)
     }
   })
   this.titulo = "Unidad"
   this.mostrar = "U"
 }

 cambiarVistaATemas(idUnidades) {
   this.idUnidadDos = idUnidades;
   
   this.temas.data.forEach(e => {
     if(idUnidades === e.idFamiliaUni){
       this.temaXUni.push(e)
     }
   })

   this.mostrar = "T"
   this.titulo = "Temas"
 }

 
 volverAMaterias(){
   this.mostrar = "M";
   this.titulo = "Materias"
 }

 volverAUnidades(){
   this.mostrar = "U";
   this.titulo = "Unidad"
   this.temaXUni = [];
 }



 /** -----------------Guardar------------------ */

 /** Materias */

 guardarMateria(): void {
   this._firebaseService.createMateria(this.materiaForm.value).then(resp => {
     this.materiaForm.reset();
     this.modalService.dismissAll();
     this.ngOnInit()
   }).catch(error => {
     console.error(error);
   })
 };

 /** Unidades */

 guardarUnidad(idDeMateria): void {
   this._unidadesFirebaseService.createUnidad(this.unidadesForm.value).then(resp => {
     this.unidadesForm.reset();
     this.modalService.dismissAll();
     this.cambiarVista(idDeMateria)
     
   }).catch(error => {
     console.error(error);
   })
 };

 /** Temas */
 guardarTemas(idDeUnidad): void {
   this._temasFirebaseServices.createTemas(this.temasForm.value).then(resp =>{
     this.temasForm.reset();
     this.modalService.dismissAll();
     this.cambiarVistaATemas(idDeUnidad);
   }).catch(error =>{
     console.error(error);
   })
 };

 /** ----------------Actualizar-------------- */
 /** Materia */

 actualizarMateria() {
   
   if (!isNullOrUndefined(this.idFirebaseMateria)) {
     this._firebaseService.updateMateria(this.idFirebaseMateria, this.materiaForm.value)
     .then(resp => {
       this.materiaForm.reset();
       this.modalService.dismissAll();
       this.ngOnInit();
     }).catch(error => {
       console.error(error)
     })
   }
   
 }

 /** Unidades */

 actualizarUnidad(idDeMateria) {
   console.log(this.unidadesForm.value.idUniFirebase)
   
   if (!isNullOrUndefined(this.idFirebaseUnidad)) {
     this._unidadesFirebaseService.updateUnidad(this.idFirebaseUnidad, this.unidadesForm.value)
     .then(resp => {
       this.unidadesForm.reset();
       this.modalService.dismissAll();
       this.cambiarVista(idDeMateria)
       
     })
     .catch(error => {
       console.error(error)
     })
   }
 }

 /** Temas */

 actualizarTemas(){
   console.log(this.idFirebaseTema)
   if(!isNullOrUndefined(this.idFirebaseTema)){
     this._temasFirebaseServices.updateTemas(this.idFirebaseTema,this.temasForm.value)
     .then(resp =>{
       this.temasForm.reset();
       this.modalService.dismissAll();
       

     })
     .catch(error =>{
       console.error(error)
     })
   }
 }




 /** ----------------Editar/Open-------------- */
 /** Materias */
 openEdit(content, item: any) {
   
  this.actualizar = true;

  console.log(item)
   
  this.materiaForm.setValue({
     idUs: item.idUs,
     idMat: item.idMat,
     nombre: item.nombre
   })
 
  this.idFirebaseMateria = item.idFirebase;

  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
  .then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }

 /**Unidades*/
 openEditUni(content, item: any) {
   
   this.actualizar = true;

   this.unidadesForm.setValue({
     idUni: item.idUni,
     idFamiliaMat: item.idFamiliaMat,
     nombre: item.nombre
   })
   
   this.idFirebaseUnidad = item.idUniFirebase;
   
   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }

 /** Temas */
 openEditTema(content ,item:any){
   this.actualizar = true;
   
   this.temasForm.setValue({
     idTema: item.idTema,
     idFamiliaUni: item.idFamiliaUni,
     nombre: item.nombre,
     nota: item.nota,
   })

   this.idFirebaseTema = item.idFirebaseTema;
   
   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }



 /** ----------------Eliminar-------------- */
 
 /** Materias */
 eliminar(item: any): void {
   for (let index = 0; index < this.unidades.data.length; index++) {
     if (this.unidades.data[index].idFamiliaMat == item.idMat) {
      const element = this.unidades.data[index];
      this.eliminarUni(element)
     }
  }
   this._firebaseService.deleteMateria(item.idFirebase);
 }


 /** Unidades */
 eliminarUni(item: any): void {
   for (let index = 0; index < this.temas.data.length; index++) {
     if (this.temas.data[index].idFamiliaUni == item.idUni) {
      const element = this.temas.data[index];
      this.eliminarTema(element)
     }
   }
   this._unidadesFirebaseService.deleteUnidad(item.idUniFirebase);
 }


 /** Temas */
 eliminarTema(item:any):void{
   this._temasFirebaseServices.deleteTemas(item.idFirebaseTema)
 }

 /**------------------------------------- modal ---------------------------------------------------- */


 open(content) {
   this.contarMaterias();
   this.contarUnidades();
   this.contarTemas();
   this.actualizar = false;
   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }

 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return `with: ${reason}`;
   }
 }

}
