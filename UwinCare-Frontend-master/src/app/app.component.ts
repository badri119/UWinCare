import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private navctrl: NavController,
    private router: Router
  ) {
    this.initializeApp();
  }


  initializeApp(){
    if(localStorage.length > 0){
      this.router.navigate(['/tabs']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
