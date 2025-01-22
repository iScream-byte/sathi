import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LocalStorageService } from './../../services/localstorage.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private router:Router, private menuCtrl: MenuController, private storage:LocalStorageService) { }

  ngOnInit() {
  }


  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);    
    setTimeout(() => {
      this.storage.getItem('rememberMe').then(res=>{
        if(res){
          this.router.navigate(['/landing-page'], { replaceUrl: true });
        }else{
          this.router.navigate(['auth/login'], { replaceUrl: true });
        }
      })
    }, 2000);
  }

  

}
