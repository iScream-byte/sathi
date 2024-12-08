import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.page.html',
  styleUrls: ['./customer-dashboard.page.scss'],
})
export class CustomerDashboardPage implements OnInit {

  constructor(private menuController: MenuController, private router:Router,private platform: Platform, private location: Location) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuController.toggle()    
  }

  goBack(){
    this.router.navigate(['landing-page'])
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.customBackAction();
    });
  }

  customBackAction() {
    console.log('Custom back action triggered!');    
    this.location.back(); 
  }

  onOptionSelected(event: any) {
    console.log('Selected value:', event.detail.value);
  }

}
