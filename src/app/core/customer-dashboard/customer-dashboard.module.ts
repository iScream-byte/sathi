import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerDashboardPageRoutingModule } from './customer-dashboard-routing.module';

import { CustomerDashboardPage } from './customer-dashboard.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDashboardPageRoutingModule,
    FooterComponent    
  ],
  declarations: [CustomerDashboardPage]
})
export class CustomerDashboardPageModule {}
