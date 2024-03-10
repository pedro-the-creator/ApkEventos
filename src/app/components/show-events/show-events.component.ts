import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  eventoSelecionado: evento | null = null;

  expandirDetalhes(evento: evento) {
    this.eventoSelecionado = evento;
  }

  editarEvento(evento: evento) {

   
  }
  fecharDetalhes() {
    this.eventoSelecionado = null;
  }
}
