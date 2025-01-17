import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Update27cPage } from './update27c.page';

const routes: Routes = [
  {
    path: '',
    component: Update27cPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Update27cPageRoutingModule {}
