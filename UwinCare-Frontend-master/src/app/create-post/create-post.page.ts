import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiRequestService } from '../api-request.service';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  responseData : any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public apiService: ApiRequestService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      feeling: ['', [Validators.required]],
      message: ['', [Validators.required]]
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

  submitPost(){
    this.apiService.postData(this.ionicForm.value, 'post/createpost').then((result) => {
      let results: any = result
      if(results.error_message){
        // this.navCtrl.setRoot(Tab1Page);
        this.presentAlert(results)
      }
      else if(results){
        this.responseData = results;
        this.router.navigate(['tabs'])
          .then(() => {
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
    subHeader: 'Failed to Add Post',
    buttons: ['Dismiss']
  });
  await alert.present(); 
  }

  
  movetotab1(){
    let navigationExtras: NavigationExtras = {
      state: {
        
      }
    };
    this.router.navigate([''], navigationExtras);
  }

}