import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TruckNoChangeApprovalPageRoutingModule } from './truck-no-change-approval-routing.module';

import { TruckNoChangeApprovalPage } from './truck-no-change-approval.page';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    TruckNoChangeApprovalPageRoutingModule,
    FooterComponent
  ],
  declarations: [TruckNoChangeApprovalPage]
})
export class TruckNoChangeApprovalPageModule {}
