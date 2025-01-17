import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Update27cPageRoutingModule } from './update27c-routing.module';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

import { Update27cPage } from './update27c.page';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    Update27cPageRoutingModule,
    FooterComponent
  ],
  declarations: [Update27cPage]
})
export class Update27cPageModule {}
