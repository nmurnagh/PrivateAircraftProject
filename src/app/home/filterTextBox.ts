import {Component, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'filter-textbox',
  template: `
         <input type="text"
                class = "form-control"
                placeholder="Search for..." 
                [(ngModel)]="filter"/>
  `,
  directives: [FORM_DIRECTIVES]
})

export class FilterTextboxComponent {
    
    model: {filter: string} = {filter: null};
    
    @Output()
    changed: EventEmitter<string> = new EventEmitter();
    
    filterChanged(event: any) {
        event.preventDefault();
        this.changed.emit(this.model.filter);
    }
}


