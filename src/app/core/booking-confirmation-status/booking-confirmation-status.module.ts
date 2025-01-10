import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingConfirmationStatusPageRoutingModule } from './booking-confirmation-status-routing.module';

import { BookingConfirmationStatusPage } from './booking-confirmation-status.page';
import { FooterComponent } from "../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingConfirmationStatusPageRoutingModule,
    FooterComponent
],
  declarations: [BookingConfirmationStatusPage]
})
export class BookingConfirmationStatusPageModule {}
