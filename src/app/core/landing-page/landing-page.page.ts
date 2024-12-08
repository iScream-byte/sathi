import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  constructor(private menuController: MenuController, private router:Router) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuController.toggle()    
  }

  navigateTo(url:string){
    this.router.navigate([url])
  }

}
