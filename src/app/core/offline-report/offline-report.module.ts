import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfflineReportPageRoutingModule } from './offline-report-routing.module';

import { OfflineReportPage } from './offline-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfflineReportPageRoutingModule
  ],
  declarations: [OfflineReportPage]
})
export class OfflineReportPageModule {}
