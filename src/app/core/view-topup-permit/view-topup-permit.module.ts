import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTopupPermitPageRoutingModule } from './view-topup-permit-routing.module';

import { ViewTopupPermitPage } from './view-topup-permit.page';
import { FooterComponent } from "../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTopupPermitPageRoutingModule,
    FooterComponent
],
  declarations: [ViewTopupPermitPage]
})
export class ViewTopupPermitPageModule {}
