import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as Constants from '../constants';


let apiUrl  = Constants.SITE_URL + 'api/';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  data = undefined;
  userData: any;
  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    if (localStorage.length != 0){
      this.userData = JSON.parse(localStorage.userData)
    }
  }

  getData(type){
    let auth_token = this.userData === undefined ? '' : this.userData['token']
    let headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Token ' + auth_token});

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

  postData(data, type){
    let auth_token = this.userData === undefined ? '' : this.userData['token']

    let headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Token ' + auth_token});

    let guest_headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});
    
    if(this.userData && this.userData['guest'] == true){
      return new Promise(resolve => {
        this.http.post(apiUrl + type, data, {headers: guest_headers} )
          .subscribe(
            data => { this.data = data
                      resolve(this.data);
          },
        (error) => {
            this.signUpAlert(error);
        })
      });
    }

    return new Promise(resolve => {
      this.http.post(apiUrl + type, data, {headers: headers} )
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
    subHeader: 'Something went wrong',
    buttons: ['Dismiss']
  });
  await alert.present(); 
  }

  async signUpAlert(err){
    const alert = this.alertCtrl.create({
      mode:'ios',
      message: "Please Signup to Continue",
      subHeader: 'Guest User Restrictions',
      buttons: ['Dismiss']
    });
    (await alert).present(); 
  }
}
