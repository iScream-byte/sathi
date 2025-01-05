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
  selector: 'app-daily-visit-summary',
  templateUrl: './daily-visit-summary.page.html',
  styleUrls: ['./daily-visit-summary.page.scss'],
})
export class DailyVisitSummaryPage implements OnInit {
  hasNetwork: boolean = null;
  roleType: string = '';
  isStartDateModalOpen = false;
  isEndDateModalOpen = false;
  selectedStartDateTime: string;
  selectedEndDateTime: string;
  districtName: string;
  noData: boolean = null;
  caListResponse?: [CAListResponseModel];
  boolHasCAResponseYes: boolean = false;
  boolHasCAResponseNo: boolean = true;
  ca?: string;

  userDetails: any = {};
  selectedDistrictId: string = '';

  dataForSearch: DailyVisitReportSearchModel = {
    userId: '',
    CaId: '',
    fromDate: '',
    toDate: '',
    DistrictID: '',
  };

  searchResults?: DailyResponseArray[];

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
        this.dataForSearch.CaId = this.userDetails.ca_id;
        if (this.roleType != 'AGENT') {
          this.dataForSearch.CaId = this.userDetails.ca_id;
        } else {
          this.dataForSearch.CaId = '';
          this.getCAList();
        }
      }
    });
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  ionViewWillEnter() {
    this.selectedDistrictId = '';
    this.districtName = '';
    this.selectedStartDateTime = '';
    this.selectedEndDateTime = '';
    this.searchResults = [];
    this.noData = null;
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
    this.router.navigate(['landing-page']);
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

  resetFilter() {
    this.selectedDistrictId = '';
    this.districtName = '';
    this.selectedStartDateTime = '';
    this.selectedEndDateTime = '';
    this.searchResults = [];
    this.noData = null;
    this.ca = '';
    this.dataForSearch.CaId = '';
  }

  search() {
    this.loader.showLoader('searching for records...');
    this.dataForSearch.DistrictID = this.selectedDistrictId;
    this.dataForSearch.fromDate = this.selectedStartDateTime;
    this.dataForSearch.toDate = this.selectedEndDateTime;
    this.coreServices
      .GetVisitReportSummary(this.dataForSearch)
      .subscribe((res: any) => {
        if (res.status == 'Success') {
          this.searchResults = res.visitLst;
          this.loader.stopLoader();
          this.noData = false;
        } else {
          this.loader.stopLoader();
          this.noData = true;
        }
      });
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

  goToDetails(item) {
    console.log(item);
    this.router.navigate([
      'daily-visit-summary',
      'details',
      { data: JSON.stringify(item) },
    ]);
  }
}
