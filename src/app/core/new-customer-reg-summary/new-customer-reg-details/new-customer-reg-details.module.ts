import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCustomerRegDetailsPageRoutingModule } from './new-customer-reg-details-routing.module';

import { NewCustomerRegDetailsPage } from './new-customer-reg-details.page';
import { FooterComponent } from "../../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCustomerRegDetailsPageRoutingModule,
    FooterComponent
],
  declarations: [NewCustomerRegDetailsPage]
})
export class NewCustomerRegDetailsPageModule {}
