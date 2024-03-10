import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
 selector: 'app-search-bar',
 templateUrl: './search-bar.component.html',
 styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
 @Input() searchTerm: string = '';
 @Output() searchTermChange = new EventEmitter<string>();

 onSearchTermChange() {
    this.searchTermChange.emit(this.searchTerm);
 }
}
