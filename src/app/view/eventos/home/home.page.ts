import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { evento } from 'src/app/model/entities/evento';
import { FirebaseService } from '../../../model/service/firebase.service';
import { AuthService } from 'src/app/model/service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  formDetalhes: FormGroup;
  eventoSelecionado: any;
  lista_eventos: evento[] = [];
  public user: any;
  eventosLoaded: boolean = false;
  searchTerm: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firebase: FirebaseService,
    private auth: AuthService
  ) {
    const user = this.auth.getUserLogged();
    if (user) {
      this.user = user;
      this.carregarEventos();
    }
    this.formDetalhes = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      dia: [''],
      mes: [''],
      ano: [''],
      horario: ['']
    });
  }

 
  carregarEventos() {
    this.firebase.read(this.user.uid).subscribe(res => {
      this.lista_eventos = res.map(evento => ({
        id: evento.payload.doc.id,
        ...evento.payload.doc.data() as any
      }) as evento);
      this.eventosLoaded = true;
    });
  }

  onEventosLoadedChange(eventosLoaded: boolean) {
    this.eventosLoaded = eventosLoaded;
 }
 
  irParaCadastrar() {
    this.router.navigate(["/cadastrar"]);
  }

  editar(evento: evento) {
    this.router.navigateByUrl("/detalhar", { state: { evento } });
  }

  logout() {
    this.auth.signOut()
      .then((res) => {
        this.router.navigate(["/signin"]);
      });
  }

  onSearchTermChange(event?: any) {
    if (event?.type === 'submit' || this.searchTerm.length > 0) {
       if (this.searchTerm.length > 0) {
         this.firebase.buscarEventosPorNome(this.searchTerm).subscribe(res => {
           this.lista_eventos = res.map(evento => ({
             id: evento.payload.doc.id,
             ...evento.payload.doc.data() as any
           }) as evento);
         });
       } else {
         this.carregarEventos(); // Recarrega eventos ao limpar a busca
       }
    } else {
       this.carregarEventos(); // Adicionado para garantir que todos os eventos sejam mostrados quando o campo de busca estiver vazio
    }
   }
   
}
