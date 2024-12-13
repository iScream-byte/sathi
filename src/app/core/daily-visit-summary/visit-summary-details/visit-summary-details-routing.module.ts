import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitSummaryDetailsPage } from './visit-summary-details.page';

const routes: Routes = [
  {
    path: '',
    component: VisitSummaryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitSummaryDetailsPageRoutingModule {}
