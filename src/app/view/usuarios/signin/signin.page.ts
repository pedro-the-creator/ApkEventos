import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/commom/alert.service';
import { AuthService } from 'src/app/model/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar: FormGroup;

  constructor(
    private alert: Alert,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    
  }

  get errorControl() {
    return this.formLogar.controls;
  }

  submitForm(): void {
    if (!this.formLogar.valid) {
      this.alert.presentAlert('Erro', 'Formulário Inválido!');
    } else {
      this.alert.simpleLoader();
      this.logar();
    }
  }

  private logar() {
    const { email, senha } = this.formLogar.value;
    this.authService.signIn(email, senha)
      .then((res) => {
        this.alert.dismissLoader();
        this.alert.presentAlert('Olá', 'Seja Bem-Vindo!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.alert.dismissLoader();
        this.alert.presentAlert('Erro ao Logar', 'Tente Novamente');
        console.log(error.message);
      });
  }

  logarComGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.alert.dismissLoader();
        this.alert.presentAlert('Olá', 'Seja Bem-Vindo!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.alert.dismissLoader();
        this.alert.presentAlert('Erro ao Logar', 'Tente Novamente');
        console.log(error.message);
      });
  }

  logarComGithub() {
    this.authService.signInWithGithub()
      .then(() => {
        this.alert.dismissLoader();
        this.alert.presentAlert('Olá', 'Seja Bem-Vindo!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.alert.dismissLoader();
        this.alert.presentAlert('Erro ao Logar', 'Tente Novamente');
        console.log(error.message);
      });
  }

  irParaSignUp() {
    this.router.navigate(['/signup']);
  }


}
