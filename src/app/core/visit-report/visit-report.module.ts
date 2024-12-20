import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './../../shared/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { VisitReportPageRoutingModule } from './visit-report-routing.module';
import { VisitReportPage } from './visit-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitReportPageRoutingModule,
    FooterComponent,    
    
  ],
  declarations: [VisitReportPage],
})
export class VisitReportPageModule {}
