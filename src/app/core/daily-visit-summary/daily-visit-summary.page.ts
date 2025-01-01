import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime, ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { CoreService } from 'src/app/services/core.service';
import { DailyVisitReportSearchModel } from 'src/app/services/Interfaces';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
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

  userDetails:any={}
  selectedDistrictId:string=''

  dataForSearch: DailyVisitReportSearchModel = {
    userId: '',
    CaId: '',
    fromDate: '',
    toDate: '',
    DistrictID: ''
  };
  
  constructor(
    private router:Router,
    private platform: Platform, 
    private location: Location,
    private menuController: MenuController,
    private modalController: ModalController,
    private storage:LocalStorageService,
    private loader:MyLoader,
    private coreServices:CoreService
    ) { }

  ngOnInit() {
    this.selectedStartDateTime = '';
    this.selectedEndDateTime = '';
    this.storage.getItem('NSUDloginDetail').then(u=>{
      if(u){
        this.userDetails=JSON.parse(u)
        this.dataForSearch.userId = this.userDetails.userId;
        this.dataForSearch.CaId = this.userDetails.ca_id;
      }
    }
      
    )
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

  openDatetimeModal(modalName:string) {
    modalName=='startDate'?
    this.isStartDateModalOpen = true:
    this.isEndDateModalOpen = true
  }

  onDateTimeChange(event: any,modalName:string) {
    const formattedDate = moment(event.detail.value).format('DD MMM YYYY');
    modalName=='startDate'?
    this.selectedStartDateTime = formattedDate:
    this.selectedEndDateTime = formattedDate
  }
  closeDatetimeModal() {
    this.isStartDateModalOpen = false;
    this.isEndDateModalOpen = false;
  }

  resetFilter(){
    this.selectedDistrictId=''
    this.districtName=''
    this.selectedStartDateTime=''
    this.selectedEndDateTime=''
  }

  search(){
    // this.loader.showLoader('searching for records...')
    // setTimeout(() => {
    //   this.loader.stopLoader()
    // }, 3000);
    this.dataForSearch.DistrictID = this.selectedDistrictId;
    this.coreServices.GetVisitReportSummary(this.dataForSearch).subscribe((res:any)=>{
      alert(res.status)
    })
    // alert(this.dataForSearch.userId)
  }


  async openDistrictSelectModal() {
    let data={
      CA_ID: this.userDetails.ca_id,
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
    this.selectedDistrictId = result.data.DistrictId;
  }

}
