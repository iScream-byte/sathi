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
import { CapacitorHttp } from '@capacitor/core';
import { configs } from 'src/environments/configs';
import { LocalStorageService2 } from 'src/app/services/localstorage.service_2';

@Component({
  selector: 'app-offline-report',
  templateUrl: './offline-report.page.html',
  styleUrls: ['./offline-report.page.scss'],
})
export class OfflineReportPage implements OnInit {
  hasNetwork: boolean = false;
  userDetails: any;
  roleType: string = '';
  userId: string = '';
  offlineReports: any = [];
  AllReports: any = [];
  constructor(
    private router: Router,
    private platform: Platform,
    private location: Location,
    private menuController: MenuController,
    private modalController: ModalController,
    private storage: LocalStorageService,
    private storage2: LocalStorageService2,
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
        this.userId = this.userDetails.userId;
      }
    });

    this.storage2.getItem('offlineData').then((res) => {
      let records = [];
      for (let i of res) {
        if (i.CreatedBY == this.userDetails.userId) {
          records.push(i);
        }
      }
      this.offlineReports = records;
      this.AllReports = res;
      // console.log(this.offlineReports);
    }
  );
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
  }

syncWithServer(item, i) {
  console.log(this.offlineReports);

  if (!this.hasNetwork) {
    this.toast.presentToast('Not Connected to network', 'error');
    return;
  }

  this.loader.showLoader();

  this.coreServices.SaveCustomerReport(item).subscribe(
    (res: any) => {
      if (res.status === 'Success') {
        if (i >= 0 && i < this.offlineReports.length) {
          this.offlineReports.splice(i, 1);
        }
        this.storage2.setItem('offlineData', this.offlineReports)
          .then(() => {
            this.toast.presentToast('Success', 'success');
            this.router.navigate(['landing-page']);
          });
        this.loader.stopLoader();
      } else {
        this.loader.stopLoader();
      }
    },
    (err) => {
      console.error(err);
      this.toast.presentToast('Something went wrong', 'error');
      this.loader.stopLoader();
    }
  );
}


  goToDetails(item) {
    delete item.filebyteADHAR
    delete item.filebyteCTO
    delete item.filebyteJIMMS
    delete item.filebyteOthers
    delete item.filebyteOthers1
    delete item.filebytePAN
    delete item.filebyteTRLICENSE
    this.router.navigate([
      'offline-report',
      'details',      
      { data: JSON.stringify(item) },
    ]);
  }
}
