import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/commom/alert.service';
import { evento } from 'src/app/model/entities/evento';
import { AuthService } from 'src/app/model/service/auth.service';
import { FirebaseService } from 'src/app/model/service/firebase.service';

@Component({
  selector: 'app-form-dados',
  templateUrl: './form-dados.component.html',
  styleUrls: ['./form-dados.component.scss'],
})
export class FormularioCadastroComponent implements OnInit {
  @Input() formCadastro!: FormGroup;
  imagem: any;
  user!: any;

  constructor(
    private alert: Alert,
    private firebase: FirebaseService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.getUserLogged();
  }

  ngOnInit() {
    this.formCadastro = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(2099)]],
      horario: ['', [Validators.required]]
     });
  }

  uploadFile(event: any) {
    this.imagem = event.target.files;
  }

  get errorControl() {
    return this.formCadastro.controls;
  }

  submitForm() {
    if (!this.formCadastro.valid) {
      this.alert.presentAlert('Erro', 'Formulário Inválido!');
      return;
    }

    // Form is valid, proceed with submission logic
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
        this.firebase // Assuming you have an uploadImage method in FirebaseService
          .uploadImage(this.imagem, novo)
          .then(() => {
            this.alert.dismissLoader();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.firebase // Assuming you have a create method in FirebaseService
          .create(novo)
          .then(() => {
            this.alert.dismissLoader();
          })
          .catch((error) => {
            console.error(error);
          });
      }

      this.formCadastro.reset();
      this.imagem = null;
    } else {
      this.alert.presentAlert('Erro', 'Preencha todos os campos!');
    }
  }
}