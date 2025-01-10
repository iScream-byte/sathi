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




  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
