import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { evento } from '../entities/evento';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'eventos';


  constructor(private firestore : AngularFirestore, private storage : AngularFireStorage) { }

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

  uploadImage(imagem: any, eventos: evento){
    const file = imagem.item(0)
    if (file.type.split('/')[0] !== 'image') {
     console.error('Tipo Não Suportado!')
     return;
    }
    const path = `images/${eventos.id}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file)
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe(resp=>{
          eventos.downloadURL = resp;
          if(!eventos.id){
            this.createWithAvatar(eventos);
          }else{
            this.updateWithImage(eventos, eventos.id);
          }

      })
    })).subscribe()
    return task;
  }

  createWithAvatar(eventos: evento){
    return this.firestore.collection(this.PATH)
    .add({      nome: eventos.nome,
      dia: eventos.dia,
      mes: eventos.mes,
      ano: eventos.ano,
      descricao: eventos.descricao,
      Horario: eventos.horario,
      downloadURL: eventos.downloadURL});
  }

  updateWithImage(eventos: evento, id: string){
    return this.firestore.collection(this.PATH).doc(id).update({nome: eventos.nome,
      dia: eventos.dia,
      mes: eventos.mes,
      ano: eventos.ano,
      descricao: eventos.descricao,
      Horario: eventos.horario,
      downloadURL: eventos.downloadURL}) 
  }
  

}
