import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertService {  
  constructor(private alertController: AlertController) {}
  async presentAlert(header='',message='') {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
