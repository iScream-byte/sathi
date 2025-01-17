import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { CoreService } from 'src/app/services/core.service';
import {
  CAListResponseModel,
  DailyResponseArray,
  DailyVisitReportSearchModel,
} from 'src/app/services/Interfaces';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';
import { Network } from '@capacitor/network';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  userDetails: any = {};
  hasNetwork: boolean = null;
  roleType: string = '';
  isStartDateModalOpen = false;
  isEndDateModalOpen = false;
  selectedStartDateTime: string;
  selectedEndDateTime: string;

  currentDate:string=''

  caListResponse?: [CAListResponseModel];
  boolHasCAResponseYes: boolean = false;
  boolHasCAResponseNo: boolean = true;
  ca?: string;
  selectedCaId:string=''
  nofificationData: any=[];


  constructor(
    private router: Router,
    private platform: Platform,
    private location: Location,
    private menuController: MenuController,
    private modalController: ModalController,
    private storage: LocalStorageService,
    private loader: MyLoader,
    private coreServices: CoreService,
    private dropdownService: DropdownService,
    private toast: ToastService
  ) { }

  async ngOnInit() {
    const status = await Network.getStatus();
    if (status.connected) {
      this.hasNetwork = true;
    } else {
      this.hasNetwork = false;
    }
    this.currentDate = moment(new Date().toISOString().split('T')[0]).format('DD MMM YYYY');
    this.selectedStartDateTime = this.currentDate
    this.selectedEndDateTime=this.currentDate
    this.storage.getItem('NSUDloginDetail').then((u) => {
      if (u) {
        this.userDetails = JSON.parse(u);
        this.roleType = this.userDetails.roletype;
        if (this.roleType != 'TSL') {
          this.selectedCaId = this.userDetails.ca_id;
          this.getNotificationList()
        } else {
          this.selectedCaId = '';
          this.getCAList();
        }
      }
    });
  }

  
  toggleMenu(){
    this.menuController.toggle()    
  }

  goBack() {
    this.location.back();
  }


  openDatetimeModal(modalName: string) {
    modalName == 'startDate'
      ? (this.isStartDateModalOpen = true)
      : (this.isEndDateModalOpen = true);
  }

  onDateTimeChange(event: any, modalName: string) {
    const formattedDate = moment(event.detail.value).format('DD MMM YYYY');
    modalName == 'startDate'
      ? (this.selectedStartDateTime = formattedDate)
      : (this.selectedEndDateTime = formattedDate);
    modalName == 'startDate'?this.selectedEndDateTime='':null
  }

  closeDatetimeModal() {
    this.isStartDateModalOpen = false;
    this.isEndDateModalOpen = false;
  }


  getCAList() {
    this.loader.showLoader();
    if (this.hasNetwork == false) {
      this.toast.presentToast(
        'You are offline. Please check network connectivity.',
        'error'
      );
      this.boolHasCAResponseYes = false;
      this.boolHasCAResponseNo = true;
      this.loader.stopLoader();
      return;
    }
    this.dropdownService.GetCAList().subscribe((res) => {
      if (res == null || res.length < 1) {
        this.toast.presentToast('No CA found', 'error');
        this.loader.stopLoader();
      } else {
        this.boolHasCAResponseYes = true;
        this.boolHasCAResponseNo = false;
        this.caListResponse = res;
        this.loader.stopLoader();
      }
    });
  }

  getCaId(val) {
    let ca: any = val.target.value;   
    if (ca.CA_ID == undefined) {
      this.selectedCaId = '';
      this.ca=''
    } else {
      this.selectedCaId = ca.CA_ID;
    }
  }


  resetFilter(){
    this.selectedStartDateTime=this.currentDate
    this.selectedEndDateTime=this.currentDate
    this.nofificationData=[]
    if(this.roleType=='TSL'){
      this.ca=''
      this.selectedCaId=''
    }
  }



  search(){    
    this.getNotificationList()
  }


  getNotificationList(){
    if(!this.selectedCaId){
      this.toast.presentToast('Please select a CA','error')
      return
    }
    this.loader.showLoader()
    const body = {
      CaId:this.selectedCaId,
      fromDate:this.selectedStartDateTime,
      toDate:this.selectedEndDateTime
    }
    
    this.coreServices.GetNotificationList(body).subscribe((res:any)=>{      
      if(res.Status=='Success'){
        this.nofificationData = res.notificationList;
        this.loader.stopLoader()
      }else{
        this.nofificationData = []
        this.loader.stopLoader()
        this.toast.presentToast('No new notifications','error')
      }      
    })


  }


}
