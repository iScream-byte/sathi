import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbacksPage } from './feedbacks.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbacksPage
  },  {
    path: 'my-feedback',
    loadChildren: () => import('./my-feedback/my-feedback.module').then( m => m.MyFeedbackPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbacksPageRoutingModule {}
