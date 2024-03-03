import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ApiRequestService } from 'src/app/api-request.service';
import * as Constants from 'src/constants';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { AlertController, NavController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';



@Component({
  selector: 'app-post-popover',
  templateUrl: './post-popover.component.html',
  styleUrls: ['./post-popover.component.scss'],
})
export class PostPopoverComponent implements OnInit {
  deletePostForm:FormGroup;
  responseData : any;

  @Input() post_id: any;

  constructor(private popCtrl: PopoverController,
    public apiService: ApiRequestService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private router: Router,
     ) {
      //console.log(navParams.get('post_id'));
      }

  ngOnInit() {
    this.deletePostForm = this.formBuilder.group({
      post_id: ['', [Validators.required]]
    })
  }


  async warning() {
    const alert = await this.alertCtrl.create({

      header: 'Warning!',
      message: '<strong>Do you want to delete the post?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: Cancelled');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.deletePost(this.post_id);
          }
        }
      ]
    });

    await alert.present();
  }



  deletePost(id) {
    this.deletePostForm.value.id=id;
    console.log(this.deletePostForm.value);
    this.apiService.postData(this.deletePostForm.value, 'post/deletepost').then((result) => {
      let results:any=result
      if(results.error_message){
        this.presentAlert(results)
        console.log(this.deletePostForm.value);
      
      }
      else if(results){
        this.responseData=results;
        console.log(this.deletePostForm.value);
        this.router.navigate(['tabs'])
          .then(() => {
            window.location.reload()});
      }
      },
      err =>{

      });
  }

  async presentAlert(err) {
    const alert = await this.alertCtrl.create({
    mode:'ios',
    message: err.error_message,
    subHeader: 'Failed to Delete Post',
    buttons: ['Dismiss']
  });
  await alert.present(); 
  }
    


    

    

      


  }




