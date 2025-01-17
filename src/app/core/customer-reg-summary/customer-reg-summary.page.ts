import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';
import { Network } from '@capacitor/network';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { CAListResponseModel, CustomerRegListArray, CustomerRegSearchModel } from 'src/app/services/Interfaces';
import * as moment from 'moment';
@Component({
  selector: 'app-customer-reg-summary',
  templateUrl: './customer-reg-summary.page.html',
  styleUrls: ['./customer-reg-summary.page.scss'],
})
export class CustomerRegSummaryPage implements OnInit {
  hasNetwork: boolean = null;
  roleType: string = '';
  userDetails: any = {};
  caListResponse?: [CAListResponseModel];
  boolHasCAResponseYes: boolean = false;
  boolHasCAResponseNo: boolean = true;
  districtName: string;
  selectedDistrictId: string = '';
  ca?: string;

  isStartDateModalOpen = false;
  isEndDateModalOpen = false;
  selectedStartDateTime: string;
  selectedEndDateTime: string;

  dataForSearch?: CustomerRegSearchModel = {
    userId: '',
    CaId: '',
    DistrictID: '',
    fromDate: '',
    toDate: ''
  };

  searchModel?: CustomerRegListArray[];

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
    private toast: ToastService,
    private acRoute:ActivatedRoute
  ) {}

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
        this.dataForSearch.userId = this.userDetails.userId;
        if (this.roleType != 'TSL') {
          this.dataForSearch.CaId = this.userDetails.ca_id;
        } else {
          this.dataForSearch.CaId = '';
          this.getCAList();
        }
      }
    });
  }

  async ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.customBackAction();
    });
  }

  customBackAction() {
    this.location.back();
  }

  goBack() {
    this.location.back();
  }

  toggleMenu() {
    this.menuController.toggle();
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
      this.dataForSearch.CaId = '';
    } else {
      this.dataForSearch.CaId = ca.CA_ID;
    }
    this.districtName = '';
    this.dataForSearch.DistrictID = '';
  }

  async openDistrictSelectModal() {
    if (!this.dataForSearch.CaId) {
      this.toast.presentToast('Please select a CA', 'error');
      return;
    }
    let data = {
      CA_ID: this.dataForSearch.CaId,
      modalName: 'district',
    };
    const modal = await this.modalController.create({
      component: SearchableDropdownComponent,
      componentProps: {
        modalData: data,
      },
    });

    modal.present();

    const result = await modal.onDidDismiss();
    this.districtName = result?.data?.DistrictName;
    this.selectedDistrictId = result?.data?.DistrictId;
  }

  resetFilter() {
    if(this.roleType=='TSL'){
      this.dataForSearch.CaId = '';
      this.ca = ''; 
    }
    this.selectedDistrictId = '';
    this.districtName = '';       
    this.selectedStartDateTime=''
    this.selectedEndDateTime=''
    this.searchModel=null
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
  }

  closeDatetimeModal() {
    this.isStartDateModalOpen = false;
    this.isEndDateModalOpen = false;
  }

  search() {
    this.loader.showLoader('searching for records...');
    this.dataForSearch.fromDate = this.selectedStartDateTime?this.selectedStartDateTime:''
    this.dataForSearch.toDate = this.selectedEndDateTime?this.selectedEndDateTime:''
    this.dataForSearch.DistrictID = this.selectedDistrictId;
    const queries =
      'userId=' +
      this.dataForSearch.userId +
      '&CaId=' +
      this.dataForSearch.CaId +
      '&fromDate=' +
      this.dataForSearch.fromDate +
      '&toDate=' +
      this.dataForSearch.toDate +
      '&DistrictID=' +
      this.dataForSearch.DistrictID;
      console.log(queries);
    this.coreServices.GetCustomerRegistrationSummary(queries).subscribe(res=>{
      if(res.status=='Success'){
        this.searchModel = res.visitLst
        this.loader.stopLoader()
      }else{
        this.searchModel=null
        this.toast.presentToast('No data found','error')
        this.loader.stopLoader()
      }
      
    })

  }


  goToDetails(data){    
    this.router.navigate(['customer-reg-details'], {
      relativeTo: this.acRoute,
      queryParams: data,
    });
    
  }

  
}
