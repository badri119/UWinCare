import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiRequestService } from '../api-request.service';
import { AuthService } from "../auth.service"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  responseData : any;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public apiRequestService: ApiRequestService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')])],
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }

  signup(){
    this.authService.postData(this.ionicForm.value, 'account/register').then((result) => {
      let results: any = result
      if(results.error_message){
        // this.navCtrl.setRoot(Tab1Page);
        this.presentAlert(results)
      }
      else if(results){
        this.responseData = results;
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.navigateRoot('tabs').then(() => {
          window.location.reload()});
      }
    },
      err => {
    });
  }

  async presentAlert(err) {
    const alert = await this.alertCtrl.create({
    mode:'ios',
    message: err.error_message,
    subHeader: 'Sign Up Failed',
    buttons: ['Dismiss']
  });
  await alert.present(); 
  }

  redirectLogin(){
    this.router.navigate(['/login']);
  }

  redirectGuestLogin(){
    this.authService.getReq('account/guest_login').then((result) => {
      let results: any = result
      if(results.error_message){
        // this.navCtrl.setRoot(Tab1Page);
        this.presentAlert(results)
      }
      else if(results){
        this.responseData = results;
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.navigateRoot('tabs').then(() => {
          window.location.reload()});
      }
    },
      err => {
    });
  }
}
