import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { evento } from 'src/app/model/entities/evento';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.scss'],
})
export class ShowEventComponent {
  @Input() lista_eventos: evento[] = [];
  @Input() eventosLoaded: boolean = false;
  @Output() eventosLoadedChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}
  

  eventoSelecionado: evento | null = null;

  expandirDetalhes(evento: evento) {
    this.eventoSelecionado = evento;
  }

  editarEvento(evento: evento) {
    this.router.navigate(['/detalhar'], { state: { evento } });
   
  }
  fecharDetalhes() {
    this.eventoSelecionado = null;
  }
}
