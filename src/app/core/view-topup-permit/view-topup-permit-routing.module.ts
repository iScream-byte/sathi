import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTopupPermitPage } from './view-topup-permit.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTopupPermitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTopupPermitPageRoutingModule {}
