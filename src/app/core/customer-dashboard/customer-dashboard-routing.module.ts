import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerDashboardPage } from './customer-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardPage
  },  {
    path: 'customer-dashboard-details',
    loadChildren: () => import('./customer-dashboard-details/customer-dashboard-details.module').then( m => m.CustomerDashboardDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDashboardPageRoutingModule {}
