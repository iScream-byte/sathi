import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { LocalStorageService } from './services/localstorage.service';
import { Router } from '@angular/router';
import { MyLoader } from './shared/MyLoader';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  appPages: any = [];
  constructor(
    private alertController: AlertController,
    private menuController: MenuController,
    private storage: LocalStorageService,
    private router: Router,
    private loader: MyLoader,
    private navCtrl:NavController,
  ) { }

  ngOnInit(): void {
    this.initApp();
  }

  requestLogOut() {
    this.presentConfirmAlert();
  }

  async presentConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to Log Out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.menuController.toggle();
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.loader.showLoader('Logging out...');
            this.menuController.toggle();
            this.storage.clearItem('rememberMe').then((res) => {
              setTimeout(() => {
                this.appPages=[]
                this.loader.dismissLoader();
                // this.router.navigate(['auth/login'], { replaceUrl: true });
                this.navCtrl.navigateRoot('auth/login');
              }, 1000);
            });
          },
        },
      ],
    });

    await alert.present();
  }

  initApp() {
    this.appPages=[]
    this.storage.getItem('NSUDloginDetail').then((res) => {
      if (res) {
        const userRole = JSON.parse(res).roletype;

        if (userRole == 'AGENT') {
          this.appPages = [
            { title: 'Home', url: 'landing-page', icon: 'home' },
            {
              title: 'View Customer Dashboard',
              url: 'customer-dashboard',
              icon: 'book',
            },
            {
              title: 'Enter Visit Report',
              url: 'visit-report',
              icon: 'report',
            },
            {
              title: 'Update 27C Form Status',
              url: 'update27c',
              icon: 'form',
            },
            {
              title: 'View & Top Up Permit',
              url: 'view-topup-permit',
              icon: 'calendar',
            },
            {
              title: 'Customer Payment',
              url: 'payment-status',
              icon: 'wallet',
            },
            {
              title: 'View Customer Complaints',
              url: 'view-complaint',
              icon: 'complaints',
            },
            {
              title: 'Daily Visit Summary (Agent)',
              url: 'daily-visit-summary',
              icon: 'time',
            },
            {
              title: 'New Cust. Reg. Summary (Today)',
              url: 'new-customer-reg-summary',
              icon: 'document',
            },
            {
              title: 'Customer Reg. Summary',
              url: 'customer-reg-summary',
              icon: 'audit',
            },
            {
              title: 'Booking Summary (Today)',
              url: 'booking-confirmation-status',
              icon: 'audit',
            },
            {
              title: 'Truck No. Change Approval',
              url: 'truck-no-change-approval',
              icon: 'document',
            },
            { title: 'Feedback', url: 'feedbacks', icon: 'thumbs' },
            { title: 'Notifications', url: 'notifications', icon: 'bell' },
            {
              title: 'Change Password',
              url: 'change-password',
              icon: 'unlock',
            },
          ];
        } 
        
        
        else if (userRole == 'CA') {
          this.appPages = [
            { title: 'Home', url: 'landing-page', icon: 'home' },
            {
              title: 'View Customer Dashboard',
              url: 'customer-dashboard',
              icon: 'book',
            },
            {
              title: 'View & Top Up Permit',
              url: 'view-topup-permit',
              icon: 'calendar',
            },
            {
              title: 'Customer Payment',
              url: 'payment-status',
              icon: 'wallet',
            },
            {
              title: 'View Customer Complaints',
              url: 'view-complaint',
              icon: 'complaints',
            },
            {
              title: 'Daily Visit Summary (Agent)',
              url: 'daily-visit-summary',
              icon: 'time',
            },
            {
              title: 'New Cust. Reg. Summary (Today)',
              url: 'new-customer-reg-summary',
              icon: 'document',
            },
            {
              title: 'Customer Reg. Summary',
              url: 'customer-reg-summary',
              icon: 'audit',
            },
            {
              title: 'Booking Summary (Today)',
              url: 'booking-confirmation-status',
              icon: 'audit',
            },
            {
              title: 'Truck No. Change Approval',
              url: 'truck-no-change-approval',
              icon: 'document',
            },
            { title: 'Feedback', url: 'feedbacks', icon: 'thumbs' },
            { title: 'Notifications', url: 'notifications', icon: 'bell' },
            {
              title: 'Change Password',
              url: 'change-password',
              icon: 'unlock',
            },
          ];
        }


        else  if(userRole == 'TSL'){
          this.appPages = [
            { title: 'Home', url: 'landing-page', icon: 'home' },
            {
              title: 'View Customer Dashboard',
              url: 'customer-dashboard',
              icon: 'book',
            },
            {
              title: 'View & Top Up Permit',
              url: 'view-topup-permit',
              icon: 'calendar',
            },
            {
              title: 'Permit Top Up Approval',
              url: 'permit-topup-approval',
              icon: 'calendar',
            },
            {
              title: 'Customer Payment',
              url: 'payment-status',
              icon: 'wallet',
            },
            {
              title: 'View Customer Complaints',
              url: 'view-complaint',
              icon: 'complaints',
            },
            {
              title: 'Daily Visit Summary (Agent)',
              url: 'daily-visit-summary',
              icon: 'time',
            },
            {
              title: 'New Cust. Reg. Summary (Today)',
              url: 'new-customer-reg-summary',
              icon: 'document',
            },
            {
              title: 'Customer Reg. Summary',
              url: 'customer-reg-summary',
              icon: 'audit',
            },
            {
              title: 'Booking Summary (Today)',
              url: 'booking-confirmation-status',
              icon: 'audit',
            },
            {
              title: 'Truck No. Change Approval',
              url: 'truck-no-change-approval',
              icon: 'document',
            },
            { title: 'Notifications', url: 'notifications', icon: 'bell' },
            {
              title: 'Change Password',
              url: 'change-password',
              icon: 'unlock',
            },
          ];
        }
      }
    });
  }

  triggerThisFunctionFromLogin() {
    this.initApp()
  }
}
