import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { ChangePasswordPage } from './change-password.page';
import { FooterComponent } from './../../shared/footer/footer.component';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule,
    FooterComponent
  ],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}
