import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Horario from 'src/app/model/entities/Horario';
import { evento } from 'src/app/model/entities/evento';
import { FirebaseService } from 'src/app/model/service/firebase.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  nome!: string;
  descricao!: string;
  ano!: number;
  mes!: number;
  dia!: number;
  horario! : Horario;
  lista_eventos: evento[] = [];

  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService ) {
  }


  ngOnInit() {
  }

  cadastrar(){
    if(!this.nome || !this.descricao){
      this.presentAlert("erro", "todos os campos são obrigatórios");
    }else{
      this.presentAlert("sucesso", "Evento cadastrado");
      let novo : evento = new evento(this.nome, this.dia, this.mes, this.ano, this.descricao, this.horario);
      this.lista_eventos.push(novo);
      console.log(novo);
      this.firebase.create(novo);
      this.router.navigate(["/home"]);
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

