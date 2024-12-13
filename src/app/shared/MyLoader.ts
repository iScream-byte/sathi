import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MyLoader {
  loader: any = '';

  constructor(private activityLoader: LoadingController) {}

  async showLoader(message: string = 'Please wait...') {
    if (this.loader && this.loader.instance) {
      this.stopLoader();
    }

    this.loader = await this.activityLoader.create({
      message,
      spinner: 'crescent',
      backdropDismiss: false,
    });

    await this.loader.present();
  }

  // Method to stop the loader
  async stopLoader() {
    if (this.loader) {
      await this.loader.dismiss();
      this.loader = '';
    }
  }

  // Method to dismiss the loader if it exists
  async dismissLoader() {
    if (this.loader) {
      try {
        await this.loader.dismiss();
        // console.log('Loader dismissed successfully.');
      } catch (error) {
        // console.error('Error while dismissing loader:', error);
      } finally {
        this.loader = null; // Ensure the loader reference is reset after dismissal
      }
    } else {
      //   console.log('No loader found to dismiss.');
    }
  }
}
