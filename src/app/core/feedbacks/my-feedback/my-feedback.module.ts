import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFeedbackPageRoutingModule } from './my-feedback-routing.module';

import { MyFeedbackPage } from './my-feedback.page';
import { FooterComponent } from "../../../shared/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyFeedbackPageRoutingModule,
    FooterComponent
],
  declarations: [MyFeedbackPage]
})
export class MyFeedbackPageModule {}
