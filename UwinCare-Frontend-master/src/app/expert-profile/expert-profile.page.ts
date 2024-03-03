import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from '../api-request.service';
import * as Constants from '../../constants';



@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.page.html',
  styleUrls: ['./expert-profile.page.scss'],
})
export class ExpertProfilePage implements OnInit {
  expert_id : any;
  expertData : any;
  site_url : any;
  constructor(
    private router: Router,
    public apiService: ApiRequestService,
    ) {

    this.site_url = Constants.SITE_URL.slice(0, -1);
    this.expert_id = this.router.getCurrentNavigation().extras.state.expert_id;
    this.getExpertDetail()
   }

  ngOnInit() {
  }

  getExpertDetail(){
    this.apiService.getData('expert/'+ this.expert_id).then(
      (result) => {
        if(result){
          this.expertData = result;
          console.log(result);
        }
      },
      err => {
      }
    );
  }
  makeCall(number){
    let tel_number = number
    console.log(tel_number);
    window.open(`tel:${tel_number}`, '_system')
  }

}
