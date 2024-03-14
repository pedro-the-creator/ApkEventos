import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { evento } from '../entities/evento';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private PATH: string = 'eventos';

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private auth: AuthService
  ) {}

  read(uid: string) {
    return this.firestore
      .collection(this.PATH, (ref) => ref.where('uid', '==', uid))
      .snapshotChanges();
  }

  public getUsuarioLogado() {
    return this.afAuth.authState;
  }

  public buscarEventosPorNome(nome: string): Observable<any[]> {
    return this.firestore
      .collection(this.PATH, (ref) => ref.where('nome', '==', nome))
      .snapshotChanges();
  }

  create(eventos: evento) {
    return this.firestore.collection(this.PATH).add({
      nome: eventos.nome,
      dia: eventos.dia,
      mes: eventos.mes,
      ano: eventos.ano,
      descricao: eventos.descricao,
      horario: eventos.horario,
      uid: eventos.uid,
    });
  }

  update(eventos: evento, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: eventos.nome,
      dia: eventos.dia,
      mes: eventos.mes,
      ano: eventos.ano,
      descricao: eventos.descricao,
      horario: eventos.horario,
      uid: eventos.uid,
    });
  }

  delete(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }

  uploadImage(imagem: any, eventos: evento) {
    return new Promise((resolve, reject) => {
      const file = imagem.item(0);
      if (file.type.split('/')[0] !== 'image') {
        console.error('Tipo Não Suportado!');
        reject('Tipo de arquivo não suportado'); 
        return;
      }

      const path = `images/${eventos.id}_${file.name}`;
      const fileRef = this.storage.ref(path);
      let task = this.storage.upload(path, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            let uploadedFileURL = fileRef.getDownloadURL();
            uploadedFileURL.subscribe(
              (resp) => {
                eventos.downloadURL = resp;
                let user = this.auth.getUserLogged();
                if (user != null) {
                  eventos.uid = user.uid;
                  if (!eventos.id) {
                    this.createWithAvatar(eventos).then(resolve).catch(reject); 
                  } else {
                    this.updateWithImage(eventos, eventos.id)
                      .then(resolve)
                      .catch(reject); 
                  }
                } else {
                  reject('Usuário não logado'); 
                }
              },
              (error) => {
                console.error('Erro ao obter URL de download:', error);
                reject('Erro ao obter URL de download'); 
              }
            );
          })
        )
        .subscribe();
    });
  }

  createWithAvatar(eventos: evento) {
    return this.firestore.collection(this.PATH).add({
      nome: eventos.nome,
      dia: eventos.dia,
      mes: eventos.mes,
      ano: eventos.ano,
      descricao: eventos.descricao,
      horario: eventos.horario,
      downloadURL: eventos.downloadURL,
      uid: eventos.uid,
    });
  }

  updateWithImage(eventos: evento, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: eventos.nome,
      dia: eventos.dia,
      mes: eventos.mes,
      ano: eventos.ano,
      descricao: eventos.descricao,
      horario: eventos.horario,
      downloadURL: eventos.downloadURL,
      uid: eventos.uid,
    });
  }
}
