import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PostPopoverComponent } from '../components/post-popover/post-popover.component';
import { ApiRequestService } from '../api-request.service';
import * as Constants from '../../constants';

import { FormGroup, Validators, FormBuilder} from "@angular/forms";
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  filterTerm: string;
  site_url : any;
  postList : any;
  commentList: any;

  addCommentForm: FormGroup;
  isSubmitted = false;
  responseData : any;

  commentObservable = false;

  deleteCommentForm:FormGroup;

  postLikeForm: FormGroup;

  heartType: string ="heart-outline";
  profileData : any;

  constructor(
    private popCtrl: PopoverController, 
    private router: Router,
    public apiService: ApiRequestService,
    public formBuilder: FormBuilder,  
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public render: Renderer2
    ) {
      this.site_url = Constants.SITE_URL.slice(0, -1);
      this.filterTerm = "";
      this.getPostList();
      this.getProfileDetail()

    }
    ngOnInit() {
      this.addCommentForm = this.formBuilder.group({
        post_id: ['', [Validators.required]],
        commentor_id: ['1', [Validators.required]],
        comment_text: ['', [Validators.required]],
        comment_parent: ['', [Validators.required]],
        number_of_claps: ['2', [Validators.required]],
        number_of_likes: ['2', [Validators.required]],
        number_of_sad: ['1', [Validators.required]]
      })
      this.deleteCommentForm = this.formBuilder.group({
        comment_id: ['', [Validators.required]]
      })
      this.postLikeForm = this.formBuilder.group({
        post_id : ['7', [Validators.required]]
      })
      this.getPostList();
    }


    getPostList(){
      this.apiService.getData('post/list?q='+ this.filterTerm).then((result) => {
        let results: any = result
        this.postList = results.reverse();
        console.log(results)
      },
        err => {
      });
    }
    search(e){
      this.getPostList()
    }
  
    get errorControl() {
      return this.addCommentForm.controls;
    }

    likePost(post_id){
      this.heartType= this.heartType== "heart" ? "heart-outline" : "heart" 
      
      //this.postLikeForm.value.post_id=post_id;
      console.log(this.postLikeForm.value);
      this.apiService.postData(this.postLikeForm.value, 'post/like').then((result) => {
        let results: any = result
        if(results.error_message){
          // this.navCtrl.setRoot(Tab1Page);
          this.presentAlert(results)
          console.log(this.postLikeForm.value);
        }
        else if(results){
          this.responseData = results;
          this.navCtrl.navigateRoot('tabs');
          console.log(this.postLikeForm.value);
        }
      },
        err => {
      });
    }

  showComment(post_id){
    if(this.commentObservable==false){
      this.commentObservable=true;

      this.apiService.getData('comment/list/'+ post_id).then((result) => {
        let results: any = result
        this.commentList = results;
        console.log(this.commentList);
      },
        err => {
      });

    }
    else if(this.commentObservable==true){
      this.commentObservable=false;
      this.commentList=null;
    }
    
  }

  submitForm() {

    this.isSubmitted = true;
    if (!this.addCommentForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.addCommentForm.value)
    }
  }

  submitComment(post_id){
    this.addCommentForm.value.post_id=post_id;
    this.showComment(post_id);
    console.log(this.addCommentForm.value);
    this.apiService.postData(this.addCommentForm.value, 'comment/create').then((result) => {
      let results: any = result
      if(results.error_message){
        // this.navCtrl.setRoot(Tab1Page);
        this.presentAlert(results)
        console.log(this.addCommentForm.value);
      }
      else if(results){
        this.responseData = results;
        this.navCtrl.navigateRoot('tabs');
        console.log(this.addCommentForm.value);
      }
    },
      err => {
    });
    this.addCommentForm.reset();

  }
  
  deleteComment(comment_id, post_id){
    this.deleteCommentForm.value.comment_id=comment_id;
    console.log(this.deleteCommentForm.value);
    this.apiService.postData(this.deleteCommentForm.value, 'comment/delete').then((result) => {
      let results: any = result
      this.showComment(post_id);
      if(results.error_message){
        // this.navCtrl.setRoot(Tab1Page);
        this.presentAlert(results)
        console.log(this.deleteCommentForm.value);
      }
      else if(results){
        this.responseData = results;
        this.navCtrl.navigateRoot('tabs');
        console.log(this.deleteCommentForm.value);
      }
    },
      err => {
    });
  }
  getProfileDetail(){
    this.apiService.getData('account/profile').then(
      (result) => {
        if(result){
          this.profileData = result;
          if(this.profileData.avatar == undefined){
            this.profileData.avatar = "assets/account.png"
          }
          else{
            this.profileData.avatar = this.site_url + this.profileData.avatar
          }
          console.log(result);
        }
      },
      err => {
      }
    );
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

  async _popOver(ev: any, post_id) {
    const popOver = await this.popCtrl.create({
      component: PostPopoverComponent,
      cssClass: 'my-popover-class',
      event: ev,
      componentProps: {
        "post_id": post_id
      }

    })
    popOver.onDidDismiss().then(data=> console.log(data))
    return await popOver.present()

  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.getPostList();
    this.commentList=null;
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}

