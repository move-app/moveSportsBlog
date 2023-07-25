import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportsEventsService {

  constructor() { }

  

  async baseGraphCMSFetch (mutation: {query: string}) {
    var data = await fetch("https://api-sa-east-1.hygraph.com/v2/cledd0zbo4llj01tbh7gh6ygz/master", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2OTAyOTM2NTUsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2xlZGQwemJvNGxsajAxdGJoN2doNnlnei9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMDFiNDFhMGEtZDIzZS00NmI5LTgzYzEtMzA3YmVhMWY2MGVjIiwianRpIjoiY2xraWQ3ODA3MDVpZTAxdXFoYXg0ZGV4aCJ9.G0x7N4lZNAU6L9XARKpZcXeRly6eWGRnzbmg7XmSrNVXWJjDhNOtG1MQZnaAr4p-2fEYrElXQlhYfMWukbyMAz_oL-Z0x6uxpJFtsi5qdUghA7b9SV-qc7YQWv6lPOroeDjvV9e5qVL5M8QXNycct31v4F0hHTgXhedyL8MZqABGtcGrp8inF9JUV6PK01O9DJeqi0hVfjBJ0pJ78Mabiy2nHAVW3u-vDJyi3E7hR8yR8VFImA_Rct0zEBscsF0jvh5DnB-4MG9GQt1l_2tW1NuiZTvgUgxj9424FMlPSynqGgqZ-aYXBCt4SppyR7n0Et-Dov0AN5y-2zNGvZV06r6TPoVkE-_l8ICOo_lisi8g1t2O5hFaJHMjL-R7tYwkKNyaSxrjnRHzuYv9QeZcZd-EHZV_094_hve1TUkVYG3XHJboymaGLKSASwFX0iSNH5sxvbNQ5ol1ITJ2DwK6wQ4unCQEh3JUcff380dWflBE3EyMbv4NLPdopKk66ig0Hr0q4ndzWbkHfUNHw2O4ZfTu23HOVL4hPN9ShGaYNJbaG5444Jb4bfc_m-_S11j-KhbxmE2uARsIIqc7v-U_e8E3Ycv48KERx7L4CGl3DjfL-OYCiPZV_KC0KgkUKm4lXNUemYA71mrr7qfsv2PryyVCk6G3C0tRLiSn3d_n-20`
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
