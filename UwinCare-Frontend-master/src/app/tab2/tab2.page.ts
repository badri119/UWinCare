import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiRequestService } from '../api-request.service';
import * as Constants from '../../constants';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  filterTerm: string;
  site_url : any;
  articleList : any;

  constructor(
    private router: Router,
    public apiService: ApiRequestService,
  ) {
      this.site_url = Constants.SITE_URL.slice(0, -1);
      this.filterTerm = "";
      this.getList();
 
      
  }
  search(e){
    this.getList()
  }

  getList(){
    this.apiService.getData('articles/list?q='+ this.filterTerm).then((result) => {
      let results: any = result
      this.articleList = results.reverse();
      console.log(results);
    },
      err => {
    });
  }

  articleDetails(article_id){
    let navigationExtras: NavigationExtras = {
      state: {
        article_id: article_id
      }
    };
    this.router.navigate(['article-details'], navigationExtras);
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
