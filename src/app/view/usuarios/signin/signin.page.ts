import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/commom/alert.service';
import { AuthService } from 'src/app/model/service/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar : FormGroup;

  constructor(private alert : Alert, private authService : AuthService, private router : Router, private formBuilder : FormBuilder) 
  {
    this.formLogar = new FormGroup({
      email : new FormControl(''),
      senha : new FormControl('')
    })
  }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      senha : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get errorControl(){
    return this.formLogar.controls;
  }

  submitForm() : boolean{
    if(!this.formLogar.valid){
      this.alert.presentAlert('Erro', 'Formulário Inválido!');
      return false;
    }else{
      this.alert.simpleLoader();
      this.logar();
      return true;
    }
  }

  private logar(){
    this.authService.signIn(this.formLogar.value['email'] , this.formLogar.value['senha'])
    .then((res) => {
      this.alert.dismissLoader();
      this.alert.presentAlert('Olá','Seja Bem-Vindo!');
      this.router.navigate(["/home"]);
    })
    .catch((error) => {
      this.alert.dismissLoader();
      this.alert.presentAlert('Erro ao Logar', 'Tente Novamente');
      console.log(error.message);
    });
  }

  logarComGoogle(){
    this.authService.signInWithGoogle()
    .then((res) => {
      this.alert.presentAlert('Olá','Seja Bem-Vindo!');
      this.router.navigate(["/home"]);
    })
    .catch((error) => {
      this.alert.presentAlert('Erro ao Logar', 'Tente Novamente');
      console.log(error.message);
    });
  }

  logarComGithub(){
    this.authService.signInWithGithub()
    .then((res) => {
      this.alert.presentAlert('Olá','Seja Bem-Vindo!');
      this.router.navigate(["/home"]);
      console.log(res);
    })
    .catch((error) => {
      this.alert.presentAlert('Erro ao Logar', 'Tente Novamente');
      console.log(error.message);
    });
  }

  irParaSignUp(){
    this.router.navigate(["/signup"]);
  }

}