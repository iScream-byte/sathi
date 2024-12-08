import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'landing-page', icon: 'home' },
    { title: 'View Customer Dashboard', url: 'customer-dashboard', icon: 'book' },
    { title: 'View & Top Up Permit', url: '/folder/favorites', icon: 'calendar' },
    { title: 'Customer Payment', url: '/folder/archived', icon: 'wallet' },
    { title: 'View Customer Complaints', url: '/folder/trash', icon: 'alert-circle' },
    { title: 'Daily Visit Summary (Agent)', url: 'daily-visit-summary', icon: 'time' },
    { title: 'New Cust. Reg. Summary (Today)', url: '/folder/spam', icon: 'document-text' },
    { title: 'Customer Reg. Summary', url: '/folder/spam', icon: 'create' },
    { title: 'Booking Summary (Today)', url: '/folder/spam', icon: 'create' },
    { title: 'Truck No. Change Approval', url: '/folder/spam', icon: 'document-text' },
    { title: 'Feedback', url: '/folder/spam', icon: 'thumbs-up' },
    { title: 'Notifications', url: '/folder/spam', icon: 'alarm' },
    { title: 'Change Password', url: '/folder/spam', icon: 'lock-open' },
    { title: 'Log Out', url: '/folder/spam', icon: 'log-out' },
  ];
  constructor() {}
}
