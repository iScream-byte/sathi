import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewComplaintPageRoutingModule } from './view-complaint-routing.module';

import { ViewComplaintPage } from './view-complaint.page';
import { FooterComponent } from "../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewComplaintPageRoutingModule,
    FooterComponent
],
  declarations: [ViewComplaintPage]
})
export class ViewComplaintPageModule {}
