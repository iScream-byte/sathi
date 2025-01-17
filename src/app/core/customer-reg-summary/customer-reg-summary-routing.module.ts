import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerRegSummaryPage } from './customer-reg-summary.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerRegSummaryPage
  },  {
    path: 'customer-reg-details',
    loadChildren: () => import('./customer-reg-details/customer-reg-details.module').then( m => m.CustomerRegDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRegSummaryPageRoutingModule {}
