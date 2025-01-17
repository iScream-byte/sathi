import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCustomerRegSummaryPage } from './new-customer-reg-summary.page';

const routes: Routes = [
  {
    path: '',
    component: NewCustomerRegSummaryPage
  },  {
    path: 'new-customer-reg-details',
    loadChildren: () => import('./new-customer-reg-details/new-customer-reg-details.module').then( m => m.NewCustomerRegDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCustomerRegSummaryPageRoutingModule {}
