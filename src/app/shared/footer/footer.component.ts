import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { MyLoader } from '../MyLoader';
import { LocalStorageService } from './../../services/localstorage.service';

@Component({
  selector: 'app-footer',
  standalone:true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports:[CommonModule,IonicModule]
})

export class FooterComponent  implements OnInit {

  constructor(
    private router:Router,
    private alertController: AlertController,
    private storage: LocalStorageService,
    private loader: MyLoader,
    private  navCtrl:NavController
    
    ) { }

  ngOnInit() {
    // console.log(this.router.getCurrentNavigation());
    
  }

  navigateTo(url:string){
    this.router.navigate([url])
  }


  requestLogOut() {
    this.presentConfirmAlert();
  }

  async presentConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.loader.showLoader('Logging out...');
            this.storage.clearItem('rememberMe').then((res) => {
              setTimeout(() => {
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





}
