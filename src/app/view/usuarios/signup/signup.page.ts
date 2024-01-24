import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/commom/alert.service';
import { AuthService } from 'src/app/model/service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formCadastrar : FormGroup;

  constructor(private alert : Alert, private authService : AuthService, private router : Router, private formBuilder : FormBuilder) {
    this.formCadastrar = new FormGroup({
      email : new FormControl(''),
      senha : new FormControl(''),
      confSenha: new FormControl('')
    })
   }

  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      senha : ['',[Validators.required, Validators.minLength(6)]],
      confSenha : ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }
  
  submitForm() : boolean{
    if(!this.formCadastrar.valid){
      this.alert.presentAlert('Erro', 'Erro ao Preencher!');
      return false;
    }else{
      this.alert.simpleLoader();
      this.cadastrar();
      return true;
    }
  }

  private cadastrar(){
    this.authService.signUpWithEmailPassword(this.formCadastrar.value['email'] , this.formCadastrar.value['senha'])
    .then((res) => {
      this.alert.dismissLoader();
      this.alert.presentAlert('Sucesso','Cadastrado com Sucesso!');
      this.router.navigate(["/signin"]);
    })
    .catch((error) => {
      this.alert.dismissLoader();
      this.alert.presentAlert('Erro', 'Erro ao realizar Cadastro' );
      console.log(error.message);
    });
  }

}