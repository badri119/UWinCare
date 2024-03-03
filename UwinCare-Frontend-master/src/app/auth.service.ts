import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as Constants from '../constants';

let apiUrl  = Constants.SITE_URL + 'api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data = undefined;
  userData: any;
  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    if (localStorage.length != 0){
      this.userData = JSON.parse(localStorage.userData)
    }
  }
  postData(credentials, type){
    if (localStorage.length == 0){
      this.userData = {};
    }
    if (localStorage.length != 0){
      this.userData = JSON.parse(localStorage.userData)
    }
    let auth_token = this.userData === undefined ? '' : this.userData['authentication_token']
    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    // headers.append('Authorization', 'Token ' + auth_token);
    return new Promise(resolve => {
              this.http.post(apiUrl + type, credentials, { headers: headers })
        .subscribe(
          data => { this.data = data
                    resolve(this.data);
        },
       (error) => {
          this.presentAlert(error);
       })
      });

  }

  getReq(type){
    // let auth_token = this.userData === undefined ? '' : this.userData['token']
    let headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});

    return new Promise(resolve => {
              this.http.get(apiUrl + type, {headers: headers} )
        .subscribe(
          data => { this.data = data
                    resolve(this.data);
        },
       (error) => {
          this.presentAlert(error);
       })
      });
  }

  async presentAlert(err) {
    const alert = await this.alertCtrl.create({
    mode:'ios',
    message: err.error.non_field_errors,
    subHeader: 'Invalid Credentials',
    buttons: ['Dismiss']
  });
  await alert.present(); 
  }
}
