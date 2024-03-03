import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpertProfilePage } from './expert-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ExpertProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpertProfilePageRoutingModule {}
