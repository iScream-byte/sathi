import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LocalStorageService } from './services/localstorage.service';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from './services/alert.service';
import { ToastService } from './services/toast.service';
import { SearchableDropdownComponent } from './utils/searchable-dropdown/searchable-dropdown.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent, SearchableDropdownComponent],
  imports: [

  BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true, // This ensures that multiple interceptors can be used if needed
    },
    LocalStorageService,
    Storage,
    AlertService,
    ToastService,
    InAppBrowser
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
