import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime, ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';

@Component({
  selector: 'app-daily-visit-summary',
  templateUrl: './daily-visit-summary.page.html',
  styleUrls: ['./daily-visit-summary.page.scss'],
})
export class DailyVisitSummaryPage implements OnInit {
  isStartDateModalOpen = false;
  isEndDateModalOpen = false;
  selectedStartDateTime: string;
  selectedEndDateTime: string;
  districtName: string;
  
  constructor(
    private router:Router,
    private platform: Platform, 
    private location: Location,
    private menuController: MenuController,
    private modalController: ModalController,
    ) { }

  ngOnInit() {
    this.selectedStartDateTime = '';
    this.selectedEndDateTime = '';
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

  openDatetimeModal(modalName) {
    modalName=='startDate'?
    this.isStartDateModalOpen = true:
    this.isEndDateModalOpen = true
  }

  onDateTimeChange(event: any,modalName:string) {
    modalName=='startDate'?
    this.selectedStartDateTime = event.detail.value:
    this.selectedEndDateTime = event.detail.value
  }
  closeDatetimeModal() {
    this.isStartDateModalOpen = false;
    this.isEndDateModalOpen = false;
  }


  async openDistrictSelectModal() {
    let data={
      CA_ID: 2,
      modalName:'district'
    }
    const modal = await this.modalController.create({
      component: SearchableDropdownComponent,
      componentProps: {
        modalData: data
      }
    });
    
    modal.present();

    const  result  = await modal.onDidDismiss();
    this.districtName = result.data.DistrictName;
    // this.districtID = result.data.DistrictId;
    // this.data.District_ID = result.data.DistrictId;
  }

}
