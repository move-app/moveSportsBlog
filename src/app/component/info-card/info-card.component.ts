import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { emptySportsEvent, sportsEvents } from 'src/app/interfaces/sportsEvents';
import { formatTimestamp } from 'src/app/helpers/helper';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent {
  @Input('event') event = emptySportsEvent;
  @Output() eventChange = new EventEmitter<sportsEvents>();

  formatTimestamp(date: Date[]){
    return formatTimestamp(date);
  }

  selectEvent(){
    window.scrollTo(0,0);
    this.eventChange.emit(this.event);
  }

}
