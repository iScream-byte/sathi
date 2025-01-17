import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCustomerRegDetailsPage } from './new-customer-reg-details.page';

const routes: Routes = [
  {
    path: '',
    component: NewCustomerRegDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCustomerRegDetailsPageRoutingModule {}
