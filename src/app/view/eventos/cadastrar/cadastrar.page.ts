import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/commom/alert.service';
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

  constructor(private alert : Alert, private router : Router, private firebase : FirebaseService, private authService :AuthService) {
      this.user = this.authService.getUserLogged();
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  ngOnInit() {
  }

  cadastrar(){
    if(this.nome && this.dia && this.mes && this.ano && this.descricao && this.horario){
      let novo: evento = new evento(this.nome, this.dia, this.mes, this.ano, this.descricao, this.horario, this.user.uid);
      novo.uid = this.user.uid;
      this.alert.simpleLoader();
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo).then(() => {
          this.alert.dismissLoader();
        })
        .catch(error => {
          console.error(error);
        });
      }else{
        this.firebase.create(novo).then(() => {
          this.alert.dismissLoader();
        }
        ).catch(error => {
          console.error(error);
        });
      }
      this.router.navigate(['/home']);
      this.alert.presentAlert("Sucesso", "Evento Cadastrado!");
    }else{
      this.alert.presentAlert("Erro", "Preencha todos os campos!");
    }
  }

  


 

}

