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

 // Variável para armazenar o evento selecionado para exibir detalhes
 eventoSelecionado: evento | null = null;

 // Método para expandir detalhes do evento
 expandirDetalhes(evento: evento) {
    this.eventoSelecionado = evento;
    // Aqui você pode emitir um evento para a página de home saber qual evento foi selecionado
    // this.eventosLoadedChange.emit(false); // Exemplo de como emitir um evento
 }

 // Método para fechar detalhes do evento
 fecharDetalhes() {
    this.eventoSelecionado = null;
    // Aqui você pode emitir um evento para a página de home saber que os detalhes foram fechados
    // this.eventosLoadedChange.emit(true); // Exemplo de como emitir um evento
 }
}
