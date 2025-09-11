import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LocalStorageService } from './../../services/localstorage.service';
import { checkIfRooted } from './../../utils/root-check.util';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storage: LocalStorageService
  ) { }

  ngOnInit() {}

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  async ionViewWillEnter() {
    this.menuCtrl.enable(false);

    const isRooted = await checkIfRooted();
    console.log(isRooted);
    
    if (isRooted) {
      alert('This device is rooted. The app cannot run on rooted devices.');
      return;
    }

    setTimeout(() => {
      this.storage.getItem('rememberMe').then(res => {
        console.log(res);
        if (res) {
          this.router.navigate(['/landing-page'], { replaceUrl: true });
        } else {
          this.router.navigate(['auth/login'], { replaceUrl: true });
        }
      });
    }, 4000);
  }
}
