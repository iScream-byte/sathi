import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitReportPage } from './visit-report.page';

const routes: Routes = [
  {
    path: '',
    component: VisitReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitReportPageRoutingModule {}
