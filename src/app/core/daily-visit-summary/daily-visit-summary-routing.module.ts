import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyVisitSummaryPage } from './daily-visit-summary.page';

const routes: Routes = [
  {
    path: '',
    component: DailyVisitSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyVisitSummaryPageRoutingModule {}
