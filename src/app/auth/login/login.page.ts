import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { configs } from './../../../environments/configs';
import { AuthServicesService } from './../../services/auth-services.service';
import { MyLoader } from './../../shared/MyLoader';
import { LocalStorageService } from './../../services/localstorage.service';
import { AlertService } from './../../services/alert.service';
import { Subscription } from 'rxjs';
import { AppComponent } from './../../app.component';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private menuCtrl: MenuController,
    private authService: AuthServicesService,
    private loader:MyLoader,
    private storage:LocalStorageService,
    private alert:AlertService,
    private app:AppComponent,
    private toast:ToastService
  ) {}
  loginForm: FormGroup;

  ngOnInit() { 


    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
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

    this.loader.showLoader('Logging in...')

    this.authService.LoginRequest(username, password).subscribe((res) => {
      // console.log('loginressssssssssssssss=======', res);
      if(res.status=='Success'){
        this.storage.setItem('NSUDloginDetail',JSON.stringify(res)).then(res=>{
            this.loader.dismissLoader()
            this.callAppFunction()
            this.toast.presentToast('Successfully logged in','success')
            this.router.navigate(['/landing-page'],{replaceUrl:true})          
        })
      }else{
        this.toast.presentToast('Invalid Credential','error')
        this.loader.dismissLoader()
      }
    });
  }

    callAppFunction() {
      this.app.triggerThisFunctionFromLogin()
    }

}
