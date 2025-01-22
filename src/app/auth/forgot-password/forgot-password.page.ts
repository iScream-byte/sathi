import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ToastService } from './../../services/toast.service';
import { AuthServicesService } from './../../services/auth-services.service';
import { MyLoader } from './../../shared/MyLoader';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  username:string = ''
  phone:string=''
  newPassword:string = ''
  confirmNewPassword:string = ''

  isSetIDorPhone: boolean= false;
  isSetOTP: boolean= false;
  isSetPassword: boolean = false;

  otp:string = ''
  otpData:any

  OTPCode:any;
  constructor(
    private menuCtrl: MenuController,
    private toast:ToastService,
    private authService:AuthServicesService,
    private loader:MyLoader
  ) { }

  ngOnInit() {
    this.isSetIDorPhone=true
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }


  validate(){
    if(!this.username && !this.phone){
      this.toast.presentToast('Please enter either username or phone number','error')
      return
    }
    let type:string;

    if(this.username && this.phone){     
      const digitsOnly = this.phone.toString().replace(/\D/g, '');
      if (digitsOnly.length !=10) {
        this.toast.presentToast("Phone number must contain 10 digits",'error');
      } else {
        type='BOTH';
        this.getValidUserApi(type)
      }
    } 
    
    
    if(!this.username && this.phone){
      const digitsOnly = this.phone.toString().replace(/\D/g, ''); // Remove non-digit characters
      if (digitsOnly.length !=10) {
        this.toast.presentToast("Phone number must contain 10 digits",'error');
      } else {
        type='MOB'
        this.username=''
        this.getValidUserApi(type)
      }
    }  
    
    
    if(this.username && !this.phone){
      type='LOG'
      this.phone=''
      this.getValidUserApi(type)
    }
  }


  getValidUserApi(type){
    this.loader.showLoader('validating...')
    const queries = 
    'loginId=' + this.username + '&mobile=' + this.phone + '&type=' + type
    this.authService.ValidateUser(queries).subscribe(res=>{
      console.log(res);      
      this.otpData = res
      this.isSetOTP=true
      this.isSetPassword=false
      this.isSetIDorPhone = false
      this.loader.stopLoader()
    },err=>{
      this.loader.stopLoader()
      this.isSetOTP=true
      this.isSetPassword=false
      this.isSetIDorPhone = false
      this.toast.presentToast('User validation error','error')
    })
  }

  validateOTP(){
    if(!this.otp){
      this.toast.presentToast('Please enter OTP','error')
      return
    }
    if (this.otp.toString().length !=8) {
      this.toast.presentToast('Please enter valid OTP','error')
      return
    }


    const digitsOnly = this.otp.toString().replace(/\D/g, '');
    const queries = 'OTPId=' + "this.otpData._OTPId" + '&OTPCode=' + this.otp + '&type=2'
    this.authService.ValidateOTP(queries).subscribe(res=>{

      if( res == "Success"){
      this.isSetIDorPhone=false
      this.isSetOTP=false
      this.isSetPassword = true;
      }


    },error=>{
      this.isSetIDorPhone=false
      this.isSetOTP=false
      this.isSetPassword = true;
    })
  }


}
