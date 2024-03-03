import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
//import { CallNumber } from '@ionic-native/call-number/ngx';

import { ExpertProfilePageRoutingModule } from './expert-profile-routing.module';

import { ExpertProfilePage } from './expert-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpertProfilePageRoutingModule
  ],
  // providers: [
  //   CallNumber],
  declarations: [ExpertProfilePage]
})
export class ExpertProfilePageModule {}
