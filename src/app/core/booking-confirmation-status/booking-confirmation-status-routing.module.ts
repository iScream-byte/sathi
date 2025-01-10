import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingConfirmationStatusPage } from './booking-confirmation-status.page';

const routes: Routes = [
  {
    path: '',
    component: BookingConfirmationStatusPage
  },  {
    path: 'booking-details',
    loadChildren: () => import('./booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingConfirmationStatusPageRoutingModule {}
