import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitSummaryDetailsPageRoutingModule } from './visit-summary-details-routing.module';

import { VisitSummaryDetailsPage } from './visit-summary-details.page';
import { FooterComponent } from "../../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitSummaryDetailsPageRoutingModule,
    FooterComponent
],
  declarations: [VisitSummaryDetailsPage]
})
export class VisitSummaryDetailsPageModule {}
