import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Horario from 'src/app/model/entities/Horario';
import { evento } from 'src/app/model/entities/evento';
import { FirebaseService } from 'src/app/model/service/firebase.service';



@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  
  user! : any;
  evento!: evento;
  nome!: string;
  descricao!: string;
  ano!: number;
  mes!: number;
  dia!: number;
  horario! : Horario;
  edicao : boolean = true;
  public imagem! : any;

  constructor(private firebase : FirebaseService, private router : Router) {

   }

  ngOnInit() {
    this.evento = history.state.evento;
    this.nome = this.evento.nome;
    this.descricao = this.evento.descricao;
    this.horario = this.evento.horario;
    this.dia = this.evento.dia;
    this.mes = this.evento.mes;
    this.ano = this.evento.ano;
  }

  habilitarEdicao(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao=true;
    }
  }


  editar(){
    let novo: evento = new evento(this.nome, this.dia, this.mes, this.ano, this.descricao, this.horario,this.user);
    novo.id = this.evento.id;
    if(this.imagem){
      this.firebase.uploadImage(this.imagem, novo);
    }else{
      novo.downloadURL = this.evento.downloadURL;
      this.firebase.update(novo, this.evento.id);
      novo.uid = this.user.uid;
    }
    
    this.router.navigate(["/home"]);
  }


  excluir(){
    this.firebase.delete(this.evento.id);
    this.router.navigate(['/home'])
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }


}