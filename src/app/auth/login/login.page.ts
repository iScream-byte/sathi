import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { configs } from './../../../environments/configs';
import { AuthServicesService } from './../../services/auth-services.service';
import { MyLoader } from './../../shared/MyLoader';
import { LocalStorageService } from './../../services/localstorage.service';
import { AlertService } from './../../services/alert.service';
import { AppComponent } from './../../app.component';
import { ToastService } from './../../services/toast.service';
import { Platform } from '@ionic/angular';
import { decryptDES_ECB_PKCS5, encryptDES_ECB_PKCS5, getCurrentDateTime } from 'src/app/utils/myencrypt';
import { CapacitorHttp } from '@capacitor/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private menuCtrl: MenuController,
    private authService: AuthServicesService,
    private loader: MyLoader,
    private storage: LocalStorageService,
    private alert: AlertService,
    private app: AppComponent,
    private toast: ToastService,
    private platform: Platform

  ) {
    
    this.platform.ready().then(() => {
      // Disable the back button
      this.platform.backButton.subscribeWithPriority(10, () => {
        // Prevent the default action (going back)
        console.log('Back button pressed, but disabled.');
      });
    });
 
  }
  loginForm: FormGroup;

  ngOnInit() {    
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  loginPress() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
      
    const body= {
      sysuser_id:username,
      sysuser_pwd:password,
      DateTime:getCurrentDateTime()
    }       
    const encrypted = encryptDES_ECB_PKCS5(JSON.stringify(body))

    this.loader.showLoader('Logging in...');
    
    this.authService.LoginRequest(`"${encrypted}"`).subscribe((res:any) => {
      console.log('loginressssssssssssssss=======', res);
      if (res) {
        res.userId=username
        this.storage
          .setItem('NSUDloginDetail', JSON.stringify(res))
          .then((res) => {
            this.loader.dismissLoader();
            this.callAppFunction();
            this.toast.presentToast('Successfully logged in', 'success');
            if (this.loginForm.value.rememberMe) {
              this.storage.setItem('rememberMe', 'true').then((res2) => {
                this.router.navigate(['/landing-page'], { replaceUrl: true });
              });
            } else {
              this.storage.clearItem('rememberMe').then((res2) => {
                this.router.navigate(['/landing-page'], { replaceUrl: true });
              });
            }
          });
      } else {
        this.toast.presentToast('Invalid Credential', 'error');
        this.loader.dismissLoader();
      }
    },(err:any)=>{
        this.toast.presentToast('Invalid Credential', 'error');
        this.loader.dismissLoader();
    })
  }

  callAppFunction() {
    this.app.triggerThisFunctionFromLogin();
  }

  gotoForgotPass(){
    this.router.navigate(['forgot-password'])
  }
}
