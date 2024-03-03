import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';


import { ArticleDetailsPageRoutingModule } from './article-details-routing.module';

import { ArticleDetailsPage } from './article-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleDetailsPageRoutingModule,
    ExploreContainerComponentModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ],
  declarations: [ArticleDetailsPage]
})
export class ArticleDetailsPageModule {}
