import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-daily-visit-summary',
  templateUrl: './daily-visit-summary.page.html',
  styleUrls: ['./daily-visit-summary.page.scss'],
})
export class DailyVisitSummaryPage implements OnInit {
  isModalOpen = false;
  selectedDateTime: string;
  constructor(
    private router:Router,
    private platform: Platform, 
    private location: Location,
    private menuController: MenuController,
    ) { }

  ngOnInit() {
    this.selectedDateTime = '';
  }

  toggleMenu(){
    this.menuController.toggle()    
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

  openDatetimeModal() {
    this.isModalOpen = true;
  }

  onDateTimeChange(event: any) {
    this.selectedDateTime = event.detail.value;
  }
  closeDatetimeModal() {
    this.isModalOpen = false;
  }

}
