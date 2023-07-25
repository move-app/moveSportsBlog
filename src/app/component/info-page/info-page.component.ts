import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatTimestamp } from 'src/app/helpers/helper';
import { emptySportsEvent, sportsEvents } from 'src/app/interfaces/sportsEvents';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent {
  @Input('event') event: sportsEvents = emptySportsEvent;
  @Output() eventChange = new EventEmitter<sportsEvents>();    
  linksValues: string[] = [];

  formatTimestamp(date: Date[]){
    return formatTimestamp(date);
  }
  
  selectEvent(){
    window.scrollTo(0,0);
    this.eventChange.emit(emptySportsEvent);
  }

  countDescriptionLines() {
    return `height: ${this.event.description.split('-').length * 25}px`;
  }

  getDescriptionWithoutLinks() {    
    const links = [];
    let desc = this.event.description;

    const linksAmount = desc.toUpperCase().split("HTTP").length - 1;

    for(let i=0; i<linksAmount; i++)
    {
      const httpsPosition = desc.toUpperCase().indexOf("HTTP");
  
      const firstHalf = desc.slice(0, httpsPosition);
      const firstBL = firstHalf.lastIndexOf('\n');
  
  
      const secondHalf = desc.slice(httpsPosition);
      const secondBL = secondHalf.indexOf('\n');
  
      const linkLine = firstHalf.slice(firstBL) + secondHalf.slice(0, secondBL);
      links.push(linkLine);

      desc = firstHalf.slice(0, firstBL) + secondHalf.slice(secondBL);
    }

    this.linksValues = links;
    
    const fDesc = this.removeFinalBreakLines(desc);
    return fDesc;
  }

  removeFinalBreakLines(text: string){
    while(text.length - text.lastIndexOf('\n') < 2)    
      text = text.slice(0, text.lastIndexOf('\n'));

      return text;
  }

  getTextLinkPart(text: string){
    const idx = text.toUpperCase().indexOf("HTTP");
    return text.slice(0, idx).replaceAll("\n", "");
  }

  getUrlLinkPart(text: string){
    const idx = text.toUpperCase().indexOf("HTTP");
    return text.slice(idx).replaceAll("\n","");
  }


}
