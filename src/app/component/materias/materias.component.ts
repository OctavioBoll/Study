import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FirebaseServiceService } from '../../services/firebase-service.service';
import { UnidadesFirebaseService } from '../../services/unidades-firebase.service';
import { TemasFirebaseService } from '../../services/temas-firebase.service';

import { UnidadesComponent } from '../unidades/unidades.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  confi: any;
  materias = { count: 10, data: [] };
  unidades = { count: 10, data: [] };
  temas = { count: 10, data: [] };
  uniXMat = [];
  temaXUni = [];
  contadorIdMaterias: number;
  contadorIdUnidades: number;
  contadorIdTemas: number;
  idMateriaDos:number;
  idUnidadDos:number;

  collection = { count: 10, data: [] };
  closeResult = '';
  mostrar = "M";
  actualizar = false;


  materiaForm: FormGroup;
  unidadesForm: FormGroup;
  temasForm: FormGroup;

  idFirebaseActualizar: string;
  idFirebaseMateria: string;
  idFirebaseUnidad: string;
  idFirebaseTema: string;


  constructor(
    private modalService: NgbModal,

    public fbMat: FormBuilder,
    public fbUni: FormBuilder,
    public fbTema: FormBuilder,

    private _firebaseService: FirebaseServiceService,
    private _unidadesFirebaseService: UnidadesFirebaseService,
    private _temasFirebaseServices: TemasFirebaseService

  ) { }

  ngOnInit(): void {
    this.idFirebaseActualizar = '';
    this.idFirebaseMateria = '';
    this.idFirebaseUnidad = '';
    this.idFirebaseTema = '';
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

    /** Materias OnInit*/
    this.materiaForm = this.fbMat.group({
      idMat: [''],
      nombre: ['']
    });

    this._firebaseService.getMaterias().subscribe(resp => {
      this.materias.data = resp.map((e: any) => {
        return {
          idMat: e.payload.doc.data().idMat,
          nombre: e.payload.doc.data().nombre,
          idFirebase: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      })



    /** Unidades OnInit*/
    this.unidadesForm = this.fbUni.group({
      idUni: [''],
      idFamiliaMat: [''],
      nombre: ['']
    });

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

    /** Temas OnInit*/
    this.temasForm = this.fbUni.group({
      idTema: [''],
      idFamiliaUni: [''],
      nombre: [''],
      nota: ['']
    });

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

  

  contarMaterias(){
     return this.contadorIdMaterias = this.materias.data.length + 1;
  };

  contarUnidades(){
    return this.contadorIdUnidades = this.unidades.data.length + 1;
  };

  contarTemas(){
    return this.contadorIdTemas = this.temas.data.length + 1;
  };


  cambiarVista(idMateria) {
    console.log(idMateria);
    this.temaXUni = [] ;
    this.uniXMat = [] ;
    this.idMateriaDos = idMateria;
    console.log(this.idMateriaDos);
    this.unidades.data.forEach(e => {
      if(idMateria === e.idFamiliaMat){
        this.uniXMat.push(e)
        console.log(e)
      }
    })
    this.mostrar = "U"
  }

  cambiarVistaATemas(idUnidades) {
    this.idUnidadDos = idUnidades;
    console.log(this.idUnidadDos);
    this.temas.data.forEach(e => {
      console.log(e.nombre)
      if(idUnidades === e.idFamiliaUni){
        this.temaXUni.push(e)
        console.log(e)
      }
    })
    this.mostrar = "T"
  }

  
  volverAMaterias(){
    this.mostrar = "M";

  }

  volverAUnidades(){
    this.mostrar = "U";
    this.temaXUni = [];
    
  }



  /** -----------------Guardar------------------ */

  /** Materias */

  guardarMateria(): void {
    this._firebaseService.createMateria(this.materiaForm.value).then(resp => {
      this.materiaForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error);
    })
  };

  /** Unidades */

  guardarUnidad(): void {
    this._unidadesFirebaseService.createUnidad(this.unidadesForm.value).then(resp => {
      this.unidadesForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error);
    })
  };

  /** Temas */
  guardarTemas(): void {
    this._temasFirebaseServices.createTemas(this.temasForm.value).then(resp =>{
      this.temasForm.reset();
      this.modalService.dismissAll();
    }).catch(error =>{
      console.error(error);
    })
    console.log(this.temasForm.value)
  };

  /** ----------------Actualizar-------------- */
  /** Materia */

  actualizarMateria() {
    if (!isNullOrUndefined(this.idFirebaseMateria)) {
      this._firebaseService.updateMateria(this.idFirebaseMateria, this.materiaForm.value).then(resp => {
        this.materiaForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error)
      })
    }
  }

  /** Unidades */

  actualizarUnidad() {
    if (!isNullOrUndefined(this.idFirebaseUnidad)) {
      this._unidadesFirebaseService.updateUnidad(this.idFirebaseUnidad, this.unidadesForm.value).then(resp => {
        this.unidadesForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error)
      })
    }
  }

  /** Temas */

  actualizarTemas(){
    console.log(this.idFirebaseTema)
    if(!isNullOrUndefined(this.idFirebaseTema)){
      this._temasFirebaseServices.updateTemas(this.idFirebaseTema,this.temasForm.value).then(resp =>{
        this.temasForm.reset();
        this.modalService.dismissAll();
      }).catch(error =>{
        console.error(error)
      })
    }
  }




  /** ----------------Editar/Open-------------- */
  /** Materias */
  openEdit(content, item: any) {
    this.actualizar = true;
    

    this.materiaForm.setValue({
      idMat: item.idMat,
      nombre: item.nombre
    })

    this.idFirebaseMateria = item.idFirebase;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**Unidades*/

  openEditUni(content, item: any) {
    console.log(this.idMateriaDos)
    this.actualizar = true;

    this.unidadesForm.setValue({
      idUni: item.idUni,
      idFamiliaMat: item.idFamiliaMat,
      nombre: item.nombre
    })

    this.idFirebaseUnidad = item.idFirebase;

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
    

    console.log(this.idFirebaseTema)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  /** ----------------Eliminar-------------- */
  /** Materias */
  eliminar(item: any): void {
    console.log(item.idFirebase)
    this._firebaseService.deleteMateria(item.idFirebase);
  }

  /** Unidades */
  eliminarUni(item: any): void {
    console.log(item.idUniFirebase)
    this._unidadesFirebaseService.deleteUnidad(item.idUniFirebase);
  }
  /** Temas */
  eliminarTema(item:any):void{
    console.log(item.idFirebaseTema)
    this._temasFirebaseServices.deleteTemas(item.idFirebaseTema)
  }

  /**----------------------------------------------------------------------------------------- */


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
