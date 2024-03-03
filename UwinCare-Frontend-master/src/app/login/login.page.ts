import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from "../auth.service"
import { Tab1Page } from '../tab1/tab1.page';
import { TabsPage } from '../tabs/tabs.page';
import { LoginPageForm } from './login.page.form';
import { SignupPage } from '../signup/signup.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  form: FormGroup;
  responseData : any;
  pushPage: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router
  ) { 
    this.pushPage = SignupPage;
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  login(){
    this.authService.postData(this.form.value, 'account/login').then((result) => {
      let results: any = result
      if(results.errors){
        // this.navCtrl.setRoot(Tab1Page);
      }
      else if(results){
        this.responseData = results;
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.router.navigate(['tabs'])
          .then(() => {
            window.location.reload()});
      }
    },
      err => {
    });

  }

  redirectSignUp(){
    this.router.navigate(['/signup']);
  }

}
