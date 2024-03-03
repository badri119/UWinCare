import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from '../api-request.service';
import * as Constants from '../../constants';
import { AlertController, NavController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder} from "@angular/forms";



@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {
  
  article_id : any;
  articleData : any;
  site_url : any;


  heartType: string = "heart-outline";
  articleLikeForm: FormGroup;
  responseData : any;

  constructor(
    private router: Router,
    public apiService: ApiRequestService,
    public formBuilder: FormBuilder,  
    public navCtrl: NavController,
    public alertCtrl: AlertController,
  ) {
    this.site_url = Constants.SITE_URL.slice(0, -1);
    this.article_id = this.router.getCurrentNavigation().extras.state.article_id;
    this.getArticleDetails()
   }

  ngOnInit() {

    this.articleLikeForm = this.formBuilder.group({
      article_id : ['', [Validators.required]]
    })
  }

  getArticleDetails(){
    this.apiService.getData('articles/'+ this.article_id).then(
      (result) => {
        if(result){
          this.articleData = result;
        }
      },
      err => {
      }
    );
  }

  likeArticle(id){
    this.heartType= this.heartType== "heart" ? "heart-outline" : "heart" 

    this.articleLikeForm.value.article_id=id;
    console.log(this.articleLikeForm.value);
    this.apiService.postData(this.articleLikeForm.value, 'articles/like/article').then((result) => {
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
      subHeader: 'Failed to like',
      buttons: ['Dismiss']
    });
    await alert.present(); 
  }

}
