import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router:Router, private menuCtrl: MenuController) { }

  ngOnInit() {
  }


  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    setTimeout(() => {
      this.router.navigate(['auth/login'], { replaceUrl: true });
    }, 2000);
  }

  

}
