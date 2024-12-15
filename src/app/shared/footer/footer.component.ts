import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
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
    
    ) { }

  ngOnInit() {
    console.log(this.router.getCurrentNavigation());
    
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
            this.storage.clearItem('NSUDloginDetail').then((res) => {
              setTimeout(() => {
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





}
