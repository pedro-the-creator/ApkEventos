import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { evento } from 'src/app/model/entities/evento';
import { FirebaseService } from '../../model/service/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lista_eventos: evento[] = [];

  constructor(private router : Router, private firebase : FirebaseService, private alertContrller : AlertController ) {
    this.firebase.read()
    .subscribe(res => {
      this.lista_eventos = res.map(evento =>{
        return{
          id: evento.payload.doc.id,
          ...evento.payload.doc.data() as any
        }as evento
      })
    })
    console.log("ola");
  }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(evento : evento){
    this.router.navigateByUrl("/detalhar", {
      state: {evento: evento}});
  }
}


