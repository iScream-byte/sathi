import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { LocalStorageService } from './services/localstorage.service';
import { Router } from '@angular/router';
import { MyLoader } from './shared/MyLoader';
import { BehaviorSubject, Subscription } from 'rxjs';


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
  ) {}

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
            this.storage.clearItem('NSUDloginDetail').then((res) => {
              setTimeout(() => {
                this.appPages=[]
                this.loader.dismissLoader();
                this.router.navigate(['auth/login'], { replaceUrl: true });
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
        console.log(userRole);
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
              icon: 'book',
            },
            {
              title: 'Update 27C Form Status',
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
              url: '/folder/archived',
              icon: 'wallet',
            },
            {
              title: 'View Customer Complaints',
              url: '/folder/trash',
              icon: 'alert-circle',
            },
            {
              title: 'Daily Visit Summary (Agent)',
              url: 'daily-visit-summary',
              icon: 'time',
            },
            {
              title: 'New Cust. Reg. Summary (Today)',
              url: '/folder/spam',
              icon: 'document-text',
            },
            {
              title: 'Customer Reg. Summary',
              url: '/folder/spam',
              icon: 'create',
            },
            {
              title: 'Booking Summary (Today)',
              url: '/folder/spam',
              icon: 'create',
            },
            {
              title: 'Truck No. Change Approval',
              url: '/folder/spam',
              icon: 'document-text',
            },
            { title: 'Feedback', url: '/folder/spam', icon: 'thumbs-up' },
            { title: 'Notifications', url: '/folder/spam', icon: 'alarm' },
            {
              title: 'Change Password',
              url: '/folder/spam',
              icon: 'lock-open',
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
              url: '/folder/archived',
              icon: 'wallet',
            },
            {
              title: 'View Customer Complaints',
              url: '/folder/trash',
              icon: 'alert-circle',
            },
            {
              title: 'Daily Visit Summary (Agent)',
              url: 'daily-visit-summary',
              icon: 'time',
            },
            {
              title: 'New Cust. Reg. Summary (Today)',
              url: '/folder/spam',
              icon: 'document-text',
            },
            {
              title: 'Customer Reg. Summary',
              url: '/folder/spam',
              icon: 'create',
            },
            {
              title: 'Booking Summary (Today)',
              url: '/folder/spam',
              icon: 'create',
            },
            {
              title: 'Truck No. Change Approval',
              url: '/folder/spam',
              icon: 'document-text',
            },
            { title: 'Feedback', url: '/folder/spam', icon: 'thumbs-up' },
            { title: 'Notifications', url: '/folder/spam', icon: 'alarm' },
            {
              title: 'Change Password',
              url: '/folder/spam',
              icon: 'lock-open',
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
              url: 'view-topup-permit',
              icon: 'calendar',
            },
            {
              title: 'Customer Payment',
              url: '/folder/archived',
              icon: 'wallet',
            },
            {
              title: 'View Customer Complaints',
              url: '/folder/trash',
              icon: 'alert-circle',
            },
            {
              title: 'Daily Visit Summary (Agent)',
              url: 'daily-visit-summary',
              icon: 'time',
            },
            {
              title: 'New Cust. Reg. Summary (Today)',
              url: '/folder/spam',
              icon: 'document-text',
            },
            {
              title: 'Customer Reg. Summary',
              url: '/folder/spam',
              icon: 'create',
            },
            {
              title: 'Booking Summary (Today)',
              url: '/folder/spam',
              icon: 'create',
            },
            {
              title: 'Truck No. Change Approval',
              url: '/folder/spam',
              icon: 'document-text',
            },
            { title: 'Feedback', url: '/folder/spam', icon: 'thumbs-up' },
            { title: 'Notifications', url: '/folder/spam', icon: 'alarm' },
            {
              title: 'Change Password',
              url: '/folder/spam',
              icon: 'lock-open',
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
