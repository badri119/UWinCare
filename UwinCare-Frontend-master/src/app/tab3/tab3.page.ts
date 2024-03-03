import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiRequestService } from '../api-request.service';
import * as Constants from '../../constants';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  site_url : any;
  expertList : any;
  constructor(
    private router: Router,
    public apiService: ApiRequestService,
    ) {
      this.site_url = Constants.SITE_URL.slice(0, -1);
      this.getList();
  }

  ngOnInIt(){

  }

  getList(){
    this.apiService.getData('expert/list').then((result) => {
      let results: any = result
      this.expertList = results;
      console.log(result);
    },
      err => {
    });
  }

  expertProfile(expert_id){
    let navigationExtras: NavigationExtras = {
      state: {
        expert_id: expert_id
      }
    };
    this.router.navigate(['expert-profile'], navigationExtras);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}
