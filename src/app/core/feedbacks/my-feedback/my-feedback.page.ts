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
import { getCurrentDateTime } from 'src/app/utils/myencrypt';
@Component({
  selector: 'app-my-feedback',
  templateUrl: './my-feedback.page.html',
  styleUrls: ['./my-feedback.page.scss'],
})
export class MyFeedbackPage implements OnInit {
  userDetails: any = {};
  hasNetwork: boolean = null;
  roleType: string = '';
  selectedCaId: string = '';
  userId: string = '';

  isStartDateModalOpen = false;
  isEndDateModalOpen = false;
  selectedStartDateTime: string;
  selectedEndDateTime: string;

  tagName:string=''
  feedbackListData = [];

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

    this.storage.getItem('NSUDloginDetail').then((u) => {
      if (u) {
        this.userDetails = JSON.parse(u);
        this.roleType = this.userDetails.roletype;
        this.userId = this.userDetails.userId;
        if (this.roleType != 'TSL') {
          this.selectedCaId = this.userDetails.ca_id;
        } else {
          this.selectedCaId = '';
          this.toast.presentToast('Unauthorized', 'error');
          setTimeout(() => {
            this.goBack();
          }, 1000);
        }
      }
    });
  }

  toggleMenu() {
    this.menuController.toggle();
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


  reset(){
    this.selectedStartDateTime=''
    this.selectedEndDateTime=''
    this.tagName=''
    this.feedbackListData=[]
  }


  search(){
    this.loader.showLoader()
    // let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append("Key", this.tagName);
    // urlSearchParams.append("fromDate", this.selectedStartDateTime? this.selectedStartDateTime:'');
    // urlSearchParams.append("toDate", this.selectedEndDateTime?this.selectedEndDateTime:'');
    const body={
      KeyId:this.tagName,
      fromDate:this.selectedStartDateTime? this.selectedStartDateTime:'',
      toDate:this.selectedEndDateTime?this.selectedEndDateTime:'',
      DateTime:getCurrentDateTime()
    }
    console.log(body);
    
    this.coreServices.MyFeedbacks(body).subscribe((res:any)=>{
      console.log(res);
      if(res.status=='Success'){
        this.feedbackListData = res.feedlist
        this.loader.stopLoader()
      }else{
        this.feedbackListData = []        
        this.toast.presentToast('No data found','error')
        this.loader.stopLoader()
      }
    },(err:any)=>{
        this.feedbackListData = []        
        this.toast.presentToast('No data found','error')
        this.loader.stopLoader()
    })
    
  }
}
