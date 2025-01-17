import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermitTopupApprovalPageRoutingModule } from './permit-topup-approval-routing.module';

import { PermitTopupApprovalPage } from './permit-topup-approval.page';
import { FooterComponent } from "../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermitTopupApprovalPageRoutingModule,
    FooterComponent
],
  declarations: [PermitTopupApprovalPage]
})
export class PermitTopupApprovalPageModule {}
