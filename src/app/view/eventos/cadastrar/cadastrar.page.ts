import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Horario from 'src/app/model/entities/Horario';
import { evento } from 'src/app/model/entities/evento';
import { AuthService } from 'src/app/model/service/auth.service';
import { FirebaseService } from 'src/app/model/service/firebase.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  user! : any;
  nome!: string;
  descricao!: string;
  ano!: number;
  mes!: number;
  dia!: number;
  horario! : Horario;
  public imagem: any;
  lista_eventos: evento[] = [];

  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService, private authService :AuthService) {
      this.user = this.authService.getUserLogged;
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  ngOnInit() {
  }

  cadastrar(){
    if(this.nome && this.descricao){
      this.firebase.getUsuarioLogado().subscribe((user) => {
        if(user != null){
          let novo : evento = new evento(this.nome, this.dia, this.mes, this.ano, this.descricao, this.horario, user.uid);
          if(this.imagem){
            this.firebase.uploadImage(this.imagem, novo);
          } else {
            this.firebase.create(novo);
          }
          this.presentAlert("Sucesso", "Evento Salvo!");
          this.router.navigate(["/home"]);
        } else {
          this.presentAlert("Erro", "Usuário não logado!");
        }
      });
    } else {
      this.presentAlert("Erro", "Campos Obrigatórios!");
    }
}

  


  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Eventos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}

