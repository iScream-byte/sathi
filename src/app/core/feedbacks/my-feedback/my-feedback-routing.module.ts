import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFeedbackPage } from './my-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: MyFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyFeedbackPageRoutingModule {}
