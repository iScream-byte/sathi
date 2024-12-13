import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
@Component({
  selector: 'app-visit-summary-details',
  templateUrl: './visit-summary-details.page.html',
  styleUrls: ['./visit-summary-details.page.scss'],
})
export class VisitSummaryDetailsPage implements OnInit {

  constructor(
    private router:Router,
    private platform: Platform, 
    private location: Location,
    private menuController: MenuController,
  ) { }

  ngOnInit() {
  }
  

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }


  goBack(){
    this.location.back();
  }

  toggleMenu(){
    this.menuController.toggle()    
  }


}
