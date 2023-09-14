import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { evento } from '../entities/evento';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'eventos';


  constructor(private firestore : AngularFirestore) { }

  read(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  create(eventos : evento){
    return this.firestore.collection(this.PATH).add({

      nome: eventos.nome,
      dia: eventos.dia,
      mes: eventos.mes,
      ano: eventos.ano,
      descricao: eventos.descricao,
      Horario: eventos.horario



    });
  }

  update(eventos : evento, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: eventos.nome,
      dia: eventos.dia,
      mes: eventos.mes,
      ano: eventos.ano,
      descricao: eventos.descricao,
      Horario: eventos.horario
    });
  }

  delete(id: string){
    return this.firestore.collection(this.PATH).doc(id).delete();
  }
}
