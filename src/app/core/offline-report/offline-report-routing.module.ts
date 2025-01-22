import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfflineReportPage } from './offline-report.page';

const routes: Routes = [
  {
    path: '',
    component: OfflineReportPage
  },  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfflineReportPageRoutingModule {}
