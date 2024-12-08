import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyVisitSummaryPageRoutingModule } from './daily-visit-summary-routing.module';

import { DailyVisitSummaryPage } from './daily-visit-summary.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyVisitSummaryPageRoutingModule,
    FooterComponent
  ],
  declarations: [DailyVisitSummaryPage]
})
export class DailyVisitSummaryPageModule {}
