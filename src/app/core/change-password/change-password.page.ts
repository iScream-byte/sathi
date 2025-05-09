import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { Network } from '@capacitor/network';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { AuthServicesService } from './../../services/auth-services.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  oldPassword:string=''
  newPassword:string=''
  confirmNewPassword:string=''
  userId:string = ''

  constructor(
    private router: Router,
    private platform: Platform,
    private location: Location,
    private menuController: MenuController,
    private modalController: ModalController,
    private storage: LocalStorageService,
    private loader: MyLoader,
    private authServices: AuthServicesService,
    private dropdownService: DropdownService,
    private toast: ToastService,
    private  navCtrl:NavController
  ) { }

  ngOnInit() {
    this.storage.getItem('NSUDloginDetail').then((val) => {
      this.userId = JSON.parse(val).userId;
    }).catch((error) => {
      this.toast.presentToast('Error fetching','error')
    });

  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }

  changePassword(){
    if(!this.oldPassword){
      this.toast.presentToast('Please enter current password','error')
      return
    }    
    if(!this.newPassword){
      this.toast.presentToast('Please enter new password','error')
      return
    }    
    if(!this.confirmNewPassword){
      this.toast.presentToast('Please confirm new password','error')
      return
    }    
    if(this.confirmNewPassword!=this.newPassword){
      this.toast.presentToast('Passwords do not match','error')
      return
    }

    this.loader.showLoader('changing password...')
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("username", this.userId);
    urlSearchParams.append("oldpassword", this.oldPassword);
    urlSearchParams.append("newpassword", this.newPassword);

    this.authServices.ChangePassword(urlSearchParams).subscribe((res:any)=>{
      if(res.status == "Success"){
        this.toast.presentToast(res.message,'success')
        this.loader.stopLoader()

        this.storage.clearItem('rememberMe').then((res) => {
          setTimeout(() => {
            this.loader.stopLoader();
            this.navCtrl.navigateRoot('auth/login');
          }, 1000);
        });
      }else{
        this.toast.presentToast(res.message,'error')
        this.loader.stopLoader()
      }
    })

  }

  

}
