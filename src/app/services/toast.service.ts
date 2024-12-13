import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(message = '', type = '') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass:
        type == 'success'
          ? 'custom-toast_success'
          : type == 'error'
          ? 'custom-toast_error'
          : 'custom-toast',
    });
    await toast.present();
  }
}
