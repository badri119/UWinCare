import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiRequestService } from '../api-request.service';
import * as Constants from '../../constants';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {
  email : any;
  profileData : any;
  site_url : any;
  constructor(
    private router: Router,
    public actionSheetController: ActionSheetController,
    public apiService: ApiRequestService
  ) { 
    this.site_url = Constants.SITE_URL.slice(0, -1);
    this.getProfileDetail()
  }

  ngOnInit() {
    // this.email = localStorage.getItem('email')
    this.email = "test@gmail.com"
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  async actionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Leaving Already?',
      cssClass: 'my-custom-class',
      buttons: [
      //   {
      //   text: 'Edit Profile',
      //   icon: 'pencil-outline',
      //   handler: () => {
      //     console.log('Share clicked');
      //   }
      // }, 
      {
        text: 'Logout',
        role: 'destructive',
        icon: 'log-out-outline',
        handler: () => {
          this.logout();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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



}
