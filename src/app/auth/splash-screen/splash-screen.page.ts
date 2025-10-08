import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { LocalStorageService } from './../../services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';
import { CapacitorJailbreakRootDetection } from '@meedika/capacitor-jailbreak-root-detection';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storage: LocalStorageService,
    private platform: Platform,
    private toast: ToastService,
  ) { }

  ngOnInit() {}

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

async ionViewWillEnter() {
  this.menuCtrl.enable(false);

  await this.platform.ready();

  try {
    const res = await CapacitorJailbreakRootDetection.isJailbrokenOrRooted();
    const res2 = await CapacitorJailbreakRootDetection.isSimulator();    
    const isRooted = res.result;
    const isSimu = res2.result;
    if (isRooted || isSimu) {
      this.toast.presentToast('Rooted Device Detected', 'error');
      // return;
    }
  } catch (err) {
    this.toast.presentToast('Error detecting root/jailbreak', 'error');
  }

  setTimeout(() => {
    this.storage.getItem('rememberMe').then(res => {
      if (res) {
        this.router.navigate(['/landing-page'], { replaceUrl: true });
      } else {
        this.router.navigate(['auth/login'], { replaceUrl: true });
      }
    });
  }, 4000);
}
}
