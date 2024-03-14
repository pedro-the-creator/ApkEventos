import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/commom/alert.service';
import { evento } from 'src/app/model/entities/evento';
import horario from 'src/app/model/entities/horario';
import { AuthService } from 'src/app/model/service/auth.service';
import { FirebaseService } from 'src/app/model/service/firebase.service';

@Component({
  selector: 'app-form-dados',
  templateUrl: './form-dados.component.html',
  styleUrls: ['./form-dados.component.scss'],
})
export class FormDadosComponent implements OnInit {
  @Input() formCadastro!: FormGroup; 
  user!: any;
  nome!: string;
  descricao!: string;
  ano!: number;
  mes!: number;
  dia!: number;
  horario!: horario;
  public imagem: any;
  eventoId!: string;
  evento!: evento;
 

  constructor(
    private alert: Alert,
    private authService: AuthService,
    private firebase: FirebaseService,
    private router: Router
  ) {
    this.user = this.authService.getUserLogged();
  }

  ngOnInit() {
    this.evento = history.state.evento;
  }

  public uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  get errorControl() {
    return this.formCadastro.controls;
  }


  excluir() {
    this.alert.simpleLoader(); 
    this.firebase.delete(this.evento.id)
      .then(() => {
        this.alert.dismissLoader();
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error(error);
        this.alert.dismissLoader();
      });
  }
 

  submitForm(): void {
    if (!this.formCadastro.valid) {
       this.alert.presentAlert('Erro', 'Formulário Inválido!');
    } else {
       this.cadastrar(); 
    }
   }

   cadastrar() {
  
    if (!this.formCadastro.valid) {
       this.alert.presentAlert('Erro', 'Formulário Inválido!');
       return; 
    }
   

    this.alert.simpleLoader();
   
  
    const nome = this.formCadastro.get('nome')?.value;
    const dia = this.formCadastro.get('dia')?.value;
    const mes = this.formCadastro.get('mes')?.value;
    const ano = this.formCadastro.get('ano')?.value;
    const descricao = this.formCadastro.get('descricao')?.value;
    const horario = this.formCadastro.get('horario')?.value;
   
    let novo: evento = new evento(nome, dia, mes, ano, descricao, horario, this.user.uid);
    novo.uid = this.user.uid;

    if (this.imagem) {
       this.firebase.uploadImage(this.imagem, novo)
         .then(() => {
           this.alert.dismissLoader();
           this.router.navigate(['/home']);
           this.alert.presentAlert('Sucesso', 'Evento Cadastrado!');
         })
         .catch((error) => {
           console.error(error);
           this.alert.dismissLoader();
           this.alert.presentAlert('Erro', 'Falha ao Cadastrar!');
         });
    } else {
       this.firebase.create(novo)
         .then(() => {
           this.alert.dismissLoader();
           this.router.navigate(['/home']);
           this.alert.presentAlert('Sucesso', 'Evento Cadastrado!');
         })
         .catch((error) => {
           console.error(error);
           this.alert.dismissLoader();
           this.alert.presentAlert('Erro', 'Falha ao Cadastrar!');
         });
    }
   }
}
