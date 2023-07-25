import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.css']
})
export class PreviewPageComponent {
  flag = false;

  constructor(private router: Router){
    const value = window.localStorage.getItem("preview-mode");

    if(!value){
      this.flag = true;
      window.localStorage.setItem('preview-mode', 'true')
    }else if (value === 'true')
    {
      window.localStorage.removeItem('preview-mode');
    }
  }

  returnHome(){
    this.router.navigate(['']);
  }

}
