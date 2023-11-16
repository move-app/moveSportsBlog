import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { sportsEvents } from '../interfaces/sportsEvents';

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
  async getSportsEvents(value: boolean) {
    console.log("🚀 ~ file: sports-events.service.ts:27 ~ SportsEventsService ~ getSportsEvents ~ value:", value)
    const cmsQuery = `query MyQuery {
      sportsEvents(stage: ${value ? "DRAFT" : "PUBLISHED"}, last: 50 ){
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
    console.log("🚀 ~ file: sports-events.service.ts:61 ~ SportsEventsService ~ getSportEvents ~ response:", response)
    const result = response?.data?.sportsEvents;
   
    return value ? result : result.filter((x: sportsEvents) => x.flagStatus === 'confirmed' || x.flagStatus === 'done');
  }

  async getSportEvents(id: string) {
    const cmsQuery = `query MyQuery {
      sportsEvents(stage: DRAFT, where: {id: "${id}"} ){
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
    const result = response?.data?.sportsEvents?.[0];

    return result;
  }
}
