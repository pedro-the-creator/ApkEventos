import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/commom/alert.service';
import { evento } from 'src/app/model/entities/evento';
import { AuthService } from 'src/app/model/service/auth.service';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import horario from 'src/app/model/entities/horario';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  formCadastro: FormGroup;

  user!: any;
  nome!: string;
  descricao!: string;
  ano!: number;
  mes!: number;
  dia!: number;
  horario!: horario;
  public imagem: any;
  lista_eventos: evento[] = [];

  constructor(
    private alert: Alert,
    private router: Router,
    private firebase: FirebaseService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.getUserLogged();
    this.formCadastro = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(2099)]],
      horario: ['', [Validators.required]]
     });
  }

  public uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  ngOnInit() {}

  get errorControl() {
    return this.formCadastro.controls;
  }

  submitForm(): void {
    if (!this.formCadastro.valid) {
      this.alert.presentAlert('Erro', 'Formulário Inválido!');
    } else {
      this.alert.simpleLoader();
    }
  }

  cadastrar() {
    const nome = this.formCadastro.get('nome')?.value;
    const dia = this.formCadastro.get('dia')?.value;
    const mes = this.formCadastro.get('mes')?.value;
    const ano = this.formCadastro.get('ano')?.value;
    const descricao = this.formCadastro.get('descricao')?.value;
    const horario = this.formCadastro.get('horario')?.value;
   
    if (nome && dia && mes && ano && descricao && horario) {
       let novo: evento = new evento(
         nome,
         dia,
         mes,
         ano,
         descricao,
         horario,
         this.user.uid
       );
       novo.uid = this.user.uid;
       this.alert.simpleLoader();
       if (this.imagem) {
         this.firebase
           .uploadImage(this.imagem, novo)
           .then(() => {
             this.alert.dismissLoader();
           })
           .catch((error) => {
             console.error(error);
           });
       } else {
         this.firebase
           .create(novo)
           .then(() => {
             this.alert.dismissLoader();
           })
           .catch((error) => {
             console.error(error);
           });
       }
       this.router.navigate(['/home']);
       this.alert.presentAlert('Sucesso', 'Evento Cadastrado!');
    } else {
       this.alert.presentAlert('Erro', 'Preencha todos os campos!');
    }
   }
   
}
