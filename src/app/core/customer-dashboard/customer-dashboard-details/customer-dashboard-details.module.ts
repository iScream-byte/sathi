import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerDashboardDetailsPageRoutingModule } from './customer-dashboard-details-routing.module';

import { CustomerDashboardDetailsPage } from './customer-dashboard-details.page';
import { FooterComponent } from "../../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDashboardDetailsPageRoutingModule,
    FooterComponent
],
  declarations: [CustomerDashboardDetailsPage]
})
export class CustomerDashboardDetailsPageModule {}
