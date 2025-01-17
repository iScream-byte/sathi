import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TruckNoChangeApprovalPage } from './truck-no-change-approval.page';

const routes: Routes = [
  {
    path: '',
    component: TruckNoChangeApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TruckNoChangeApprovalPageRoutingModule {}
