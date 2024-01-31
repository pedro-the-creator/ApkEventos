import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import horario from 'src/app/model/entities/horario';
import { evento } from 'src/app/model/entities/evento';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { AuthService } from 'src/app/model/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/commom/alert.service';



@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  formDetalhar: FormGroup;
  user! : any;
  evento!: evento;
  nome!: string;
  descricao!: string;
  ano!: number;
  mes!: number;
  dia!: number;
  horario! : horario;
  edicao : boolean = true;
  public imagem! : any;

  constructor(private firebase : FirebaseService,
     private router : Router,
     private authService : AuthService,
     private formBuilder : FormBuilder,
     private alert : Alert) {
    this.user = this.authService.getUserLogged();
    this.formDetalhar = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      dia: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      horario: ['', [Validators.required]]  
        
    });
  }

  ngOnInit() {
    this.evento = history.state.evento;
    this.formDetalhar = this.formBuilder.group({
       nome: [this.evento.nome, [Validators.required]],
       descricao: [this.evento.descricao, [Validators.required]],
       dia: [this.evento.dia, [Validators.required, Validators.min(1), Validators.max(31)]],
       mes: [this.evento.mes, [Validators.required, Validators.min(1), Validators.max(12)]],
       ano: [this.evento.ano, [Validators.required, Validators.min(1900), Validators.max(2099)]],
       horario: [this.evento.horario, [Validators.required]]
    });
    this.formDetalhar.disable(); // desativa o formulário no início
  
   }
   

  get errorControl() {
    return this.formDetalhar.controls;
  }

  
  submitForm(): void {
    if (!this.formDetalhar.valid) {
       this.alert.presentAlert('Erro', 'Formulário Inválido!');
    } else {
       this.alert.simpleLoader();
       this.editar();
    }
   }
   

habilitarEdicao() {
  if (this.edicao) {
    this.edicao = false;
    this.formDetalhar.disable(); // desativa o formulário se a edição estiver desativada
  } else {
    this.edicao = true;
    this.formDetalhar.enable(); // ativa o formulário se a edição estiver ativada
  }
}

editar() {
  let formValues = this.formDetalhar.getRawValue();
  let novo: evento = new evento(formValues.nome, formValues.dia, formValues.mes, formValues.ano, formValues.descricao, formValues.horario, this.user.uid);
  novo.id = this.evento.id;
  this.alert.simpleLoader();
  if(this.imagem){
     this.firebase.uploadImage(this.imagem, novo)
       .then(() => {
         this.alert.dismissLoader();
         this.router.navigate(["/home"]);
       })
       .catch(error => {
         console.error(error);
         this.alert.dismissLoader(); // Adicionado para garantir que o loader seja fechado mesmo se houver um erro
       });
 } else {
     novo.downloadURL = this.evento.downloadURL;
     this.firebase.update(novo, this.evento.id)
       .then(() => {
         this.alert.dismissLoader();
         this.router.navigate(["/home"]);
       })
       .catch(error => {
         console.error(error);
         this.alert.dismissLoader(); // Adicionado para garantir que o loader seja fechado mesmo se houver um erro
       });
     novo.uid = this.user.uid;
 }
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


  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

}