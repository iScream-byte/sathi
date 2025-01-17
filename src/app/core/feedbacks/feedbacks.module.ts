import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbacksPageRoutingModule } from './feedbacks-routing.module';

import { FeedbacksPage } from './feedbacks.page';
import { FooterComponent } from "../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbacksPageRoutingModule,
    FooterComponent
],
  declarations: [FeedbacksPage]
})
export class FeedbacksPageModule {}
