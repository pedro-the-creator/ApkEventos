import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, browserPopupRedirectResolver, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioDados: any;

  constructor(private fireAuth: AngularFireAuth, private ngZone: NgZone) {
    this.fireAuth.authState.subscribe(usuario => {
      if(usuario){
        this.usuarioDados = usuario;
        localStorage.setItem('usuario', JSON.stringify(this.usuarioDados));
      }else{
        localStorage.setItem('usuario', 'null');
      }
    });
  }

  //Login com Email e Senha
  public signIn(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  public signUpWithEmailPassword(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  public recoverPassword(email: string){
    return this.fireAuth.sendPasswordResetEmail(email);
  }
  
  //metodos gerais
  public signOut(){
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('usuario');
    });
  }

  public getUserLogged(){
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    if(usuario !== null){
      return usuario;
    }else{
      return null;
    }
  }

   public isLoggedIn(): boolean{
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
      return (usuario !== null) ? true : false;
   }

   public signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
   }

   public signInWithGithub(){
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
   }
}