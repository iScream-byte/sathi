import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';
import { Network } from '@capacitor/network';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';
import { CAListResponseModel, PaymentDataSend, PaymentListArray } from './../../services/Interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.page.html',
  styleUrls: ['./payment-status.page.scss'],
})
export class PaymentStatusPage implements OnInit {
  currentDate: string;
  hasNetwork:boolean=true
  userDetails:any={}
  roleType:string=''
  caListResponse?: [CAListResponseModel];
  boolHasCAResponseYes: boolean = false;
  boolHasCAResponseNo: boolean = true;
  ca?: string;
  customerName: string;
  customerCode: string;
  selectedCaId:string=''
  selectedLocId:string=''
  selectedStartDateTime: string;
  selectedEndDateTime: string;
  startDateInDTFormat:any
  minimumEndDate:string=''
  maximumEndDate:string=''
  isStartDateModalOpen = false;
  isEndDateModalOpen = false;
  dataForPaymentStatus: PaymentDataSend = {
    toDate: '',
    CustomerCode: '',
    caid: '',
    formDate: '',
    LocId: ''
  }
  paymentListArray?: PaymentListArray[];
  totalPayment?: string;
  isPaymentListExist: boolean = false;
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
  ) {}

  async ngOnInit() {
    this.currentDate = new Date().toISOString().split('T')[0];
    this.startDateInDTFormat = this.currentDate
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
        console.log(this.userDetails);
        // this.dataForSearch.userId = this.userDetails.userId;
        // this.dataForSearch.CaId = this.userDetails.ca_id;
        if (this.roleType != 'TSL') {
          this.selectedCaId=this.userDetails.ca_id
          this.selectedLocId=this.userDetails.Loc_ID

          this.dataForPaymentStatus.caid = this.selectedCaId
          this.dataForPaymentStatus.LocId = this.selectedLocId
        } else {
          // this.dataForSearch.CaId = '';
          this.getCAList();
        }
      }
    });
  }


  async ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
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
      this.selectedLocId = '';

      this.dataForPaymentStatus.caid = this.selectedCaId
      this.dataForPaymentStatus.LocId = this.selectedLocId
    } else {
      this.selectedCaId = ca.CA_ID;
      this.selectedLocId=ca.Loc_ID

      this.dataForPaymentStatus.caid = this.selectedCaId
      this.dataForPaymentStatus.LocId = this.selectedLocId
    }
    // this.districtName = '';
    // this.dataForSearch.DistrictID = '';
  }


  async openCustomerSelectModal() {
    if(!this.selectedCaId){
      this.toast.presentToast('Please select a CA','error')
      return
    }
    let data = {
      CA_ID: this.selectedCaId,
      modalName: 'customer',
    };    
    const modal = await this.modalController.create({
      component: SearchableDropdownComponent,
      componentProps: {
        modalData: data,
      },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    this.customerName = result?.data?.CustomerName;
    this.customerCode = result?.data?.Customer_Code;

    this.dataForPaymentStatus.CustomerCode = this.customerCode?this.customerCode:''
  }


  openDatetimeModal(modalName: string) {
    modalName == 'startDate'
      ? (this.isStartDateModalOpen = true)
      : (this.isEndDateModalOpen = true);
  }

  onDateTimeChange(event: any, modalName: string) {
    const formattedDate = moment(event.detail.value).format('DD MMM YYYY');
  
    if (modalName === 'startDate') {
      this.selectedStartDateTime = formattedDate;
      this.dataForPaymentStatus.formDate = formattedDate;
      this.startDateInDTFormat=new Date(formattedDate).toISOString().split('T')[0];      
      this.selectedEndDateTime=''
      this.maximumEndDate=moment(this.selectedStartDateTime).format("YYYY-MM-DD")
      this.minimumEndDate = this.maximumEndDate;
      const endDateMoment = moment(moment(this.maximumEndDate).add(30,'days')).format("YYYY-MM-DD");
      var dateCheck = moment(endDateMoment).isAfter(moment().format("YYYY-MM-DD"), 'day');

      if (dateCheck == true) {
        this.maximumEndDate = moment().format("YYYY-MM-DD");
        console.log("date check true---> ", this.maximumEndDate);
      } else {
        this.maximumEndDate = endDateMoment;
        console.log("date check false---> ", this.maximumEndDate);
      }
      

    } else {
      this.selectedEndDateTime = formattedDate;
      this.dataForPaymentStatus.toDate = formattedDate;
      // this.complaintsSearchModel.toDate = formattedDate;
    }
  }

  
  closeDatetimeModal() {
    this.isStartDateModalOpen = false;
    this.isEndDateModalOpen = false;
  }

  cancelDatetimeModal(modalName:string) {
    this.isStartDateModalOpen = false;
    this.isEndDateModalOpen = false;
    modalName=='startDate'?
      this.selectedStartDateTime='':
      this.selectedEndDateTime=''
  }


  resetFilter(){
    this.ca=''
    this.selectedStartDateTime=''
    this.selectedEndDateTime=''
    this.customerName=''
    this.customerCode=''
    this.minimumEndDate=''
    this.maximumEndDate=''
    this.paymentListArray=[]
    this.totalPayment = ''
    this.isPaymentListExist = false
  }


  search(){
    if(!this.selectedStartDateTime){
      this.toast.presentToast('Please select start date','error')
      return
    }    
    if(!this.selectedEndDateTime){
      this.toast.presentToast('Please select end date','error')
      return
    }
    const searchQuery = 
    'caid=' + this.dataForPaymentStatus.caid + '&LocId=' + this.dataForPaymentStatus.LocId + '&CustomerCode=' + this.dataForPaymentStatus.CustomerCode + '&formDate=' + this.dataForPaymentStatus.formDate + '&toDate=' + this.dataForPaymentStatus.toDate
  
    console.log(searchQuery);

    this.loader.showLoader('Fetching payment records...')
    this.coreServices.GetPaymentStatus(searchQuery).subscribe(res=>{
      if (res.Status == "Success") {
        this.loader.stopLoader();
        this.totalPayment = res.TotalPayment;
        this.paymentListArray = res.paymentLst;
        if (this.paymentListArray.length > 0) {
          this.isPaymentListExist = true;
        } else {
          this.isPaymentListExist = false;
        }
      } else {
        this.isPaymentListExist = false;
        this.toast.presentToast("Data not found",'error')
        this.loader.stopLoader();
      }
      
    })
    
  
  
  
  }
}
