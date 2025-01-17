import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermitTopupApprovalPage } from './permit-topup-approval.page';

const routes: Routes = [
  {
    path: '',
    component: PermitTopupApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermitTopupApprovalPageRoutingModule {}
