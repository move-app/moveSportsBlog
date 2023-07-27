import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SportsEventsService {

  constructor() { }

  

  async baseGraphCMSFetch (mutation: {query: string}) {
    var data = await fetch(environment.apiUrl, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "authorization": `Bearer ${environment.apiKey}`
        },
        body: JSON.stringify(mutation)
    }).then(resp => resp.json());

    return data;
}
  async getSportsEvents() {
    const value = window.localStorage.getItem("preview-mode");
    
    const cmsQuery = `query MyQuery {
      sportsEvents(stage: ${value ? "DRAFT" : "PUBLISHED"} ){
       id
       title
       description
       date
       address
       price
       flagStatus
       imgUrl
     }                 
   }`

    const response = (await this.baseGraphCMSFetch({query: cmsQuery}));
    const result = response?.data?.sportsEvents;

    return result;
  }
}
