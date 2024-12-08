import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-daily-visit-summary',
  templateUrl: './daily-visit-summary.page.html',
  styleUrls: ['./daily-visit-summary.page.scss'],
})
export class DailyVisitSummaryPage implements OnInit {

  constructor(private router:Router,private platform: Platform, private location: Location) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.customBackAction();
    });
  }

  customBackAction() {
    this.location.back(); 
  }

  goBack(){
    this.router.navigate(['landing-page'])
  }

}
