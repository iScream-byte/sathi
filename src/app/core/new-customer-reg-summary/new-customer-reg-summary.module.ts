import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCustomerRegSummaryPageRoutingModule } from './new-customer-reg-summary-routing.module';

import { NewCustomerRegSummaryPage } from './new-customer-reg-summary.page';
import { FooterComponent } from "../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCustomerRegSummaryPageRoutingModule,
    FooterComponent
],
  declarations: [NewCustomerRegSummaryPage]
})
export class NewCustomerRegSummaryPageModule {}
