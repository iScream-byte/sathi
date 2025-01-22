import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () => import('./auth/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },

  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./core/landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'customer-dashboard',
    loadChildren: () => import('./core/customer-dashboard/customer-dashboard.module').then( m => m.CustomerDashboardPageModule)
  },
  {
    path: 'daily-visit-summary',
    loadChildren: () => import('./core/daily-visit-summary/daily-visit-summary.module').then( m => m.DailyVisitSummaryPageModule)
  },
  {
    path: 'view-topup-permit',
    loadChildren: () => import('./core/view-topup-permit/view-topup-permit.module').then( m => m.ViewTopupPermitPageModule)
  },
  {
    path: 'visit-report',
    loadChildren: () => import('./core/visit-report/visit-report.module').then( m => m.VisitReportPageModule)
  },  {
    path: 'view-complaint',
    loadChildren: () => import('./core/view-complaint/view-complaint.module').then( m => m.ViewComplaintPageModule)
  },
  {
    path: 'payment-status',
    loadChildren: () => import('./core/payment-status/payment-status.module').then( m => m.PaymentStatusPageModule)
  },
  {
    path: 'booking-confirmation-status',
    loadChildren: () => import('./core/booking-confirmation-status/booking-confirmation-status.module').then( m => m.BookingConfirmationStatusPageModule)
  },
  {
    path: 'new-customer-reg-summary',
    loadChildren: () => import('./core/new-customer-reg-summary/new-customer-reg-summary.module').then( m => m.NewCustomerRegSummaryPageModule)
  },
  {
    path: 'customer-reg-summary',
    loadChildren: () => import('./core/customer-reg-summary/customer-reg-summary.module').then( m => m.CustomerRegSummaryPageModule)
  },
  {
    path: 'update27c',
    loadChildren: () => import('./core/update27c/update27c.module').then( m => m.Update27cPageModule)
  },
  {
    path: 'permit-topup-approval',
    loadChildren: () => import('./core/permit-topup-approval/permit-topup-approval.module').then( m => m.PermitTopupApprovalPageModule)
  },
  {
    path: 'truck-no-change-approval',
    loadChildren: () => import('./core/truck-no-change-approval/truck-no-change-approval.module').then( m => m.TruckNoChangeApprovalPageModule)
  },
  {
    path: 'offline-report',
    loadChildren: () => import('./core/offline-report/offline-report.module').then( m => m.OfflineReportPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./core/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'feedbacks',
    loadChildren: () => import('./core/feedbacks/feedbacks.module').then( m => m.FeedbacksPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./core/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },




  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
