import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerRegSummaryPageRoutingModule } from './customer-reg-summary-routing.module';

import { CustomerRegSummaryPage } from './customer-reg-summary.page';
import { FooterComponent } from "../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerRegSummaryPageRoutingModule,
    FooterComponent
],
  declarations: [CustomerRegSummaryPage]
})
export class CustomerRegSummaryPageModule {}
