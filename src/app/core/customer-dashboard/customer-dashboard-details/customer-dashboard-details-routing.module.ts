import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerDashboardDetailsPage } from './customer-dashboard-details.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDashboardDetailsPageRoutingModule {}
