import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoginResponseModel } from 'src/app/services/Interfaces';
import { LocalStorageService } from './../../services/localstorage.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  constructor(
    private menuController: MenuController, 
    private router:Router, 
    private storage: LocalStorageService,
    private toast:ToastService
    ) { }

  userData:LoginResponseModel
  ngOnInit() {    
  }

  ionViewWillEnter(){
    this.storage.getItem('NSUDloginDetail').then(res=>{
      if(res){
        this.userData=JSON.parse(res)      
        
      }
    })

  }

  toggleMenu(){
    this.menuController.toggle()    
  }

  navigateTo(url:string){
    this.router.navigate([url])
  }


}
