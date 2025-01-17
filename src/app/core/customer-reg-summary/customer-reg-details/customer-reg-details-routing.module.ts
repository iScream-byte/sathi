import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerRegDetailsPage } from './customer-reg-details.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerRegDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRegDetailsPageRoutingModule {}
