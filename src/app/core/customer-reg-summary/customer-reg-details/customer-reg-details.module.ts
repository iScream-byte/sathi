import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerRegDetailsPageRoutingModule } from './customer-reg-details-routing.module';

import { CustomerRegDetailsPage } from './customer-reg-details.page';
import { FooterComponent } from "../../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerRegDetailsPageRoutingModule,
    FooterComponent
],
  declarations: [CustomerRegDetailsPage]
})
export class CustomerRegDetailsPageModule {}
