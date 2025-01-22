import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';
import { Network } from '@capacitor/network';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';
import * as moment from 'moment';
import {
  BookingSummaryResponseModel,
  LoginResponseModel,
} from 'src/app/services/Interfaces';

@Component({
  selector: 'app-booking-confirmation-status',
  templateUrl: './booking-confirmation-status.page.html',
  styleUrls: ['./booking-confirmation-status.page.scss'],
})
export class BookingConfirmationStatusPage implements OnInit {
  userDetails: LoginResponseModel;
  loggedInUserLocationId: string;
  loggedInUserLocationName: string;
  loggedInUserCaId: string;
  formatDate: any;
  bookingSummaryDetails?: BookingSummaryResponseModel = {
    Received: '',
    AutoReject: '',
    Pending: '',
    Approved: '',
    Rejected: '',
    Confirmed: '',
    UniqueCustomer: '',
    Status: '',
    message: '',
    BookStatus: '',
    Customer_Code: '',
    CustomerName: '',
    TruckNo: '',
    Quantity: '',
    Loc_ID: '',
    ca_id: '',
    CaName: '',
  };

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loader.showLoader();
    let date = new Date();
    this.formatDate = moment(date).format("DD-MM-YYYY");
    this.storage.getItem('NSUDloginDetail').then((u) => {
      if (u) {
        this.userDetails = JSON.parse(u);
        if (this.userDetails.roletype == 'TSL') {
          this.loggedInUserCaId = '';
        } else {
          this.loggedInUserCaId = this.userDetails.ca_id;
        }
        this.loggedInUserLocationId = this.userDetails.Loc_ID;
        this.loggedInUserLocationName = this.userDetails.Location;
        this.getBookingSummaryDetails();
      }
    });
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }


  getBookingSummaryDetails() {
    const queries =
      '&LocId=' +
      this.loggedInUserLocationId +
      '&CaId=' +
      this.loggedInUserCaId;
    this.coreServices.GetBookingSummary(queries).subscribe((res) => {
      if (res.Status == 'Success') {
        this.bookingSummaryDetails = res;
        this.loader.stopLoader();
      } else {
        this.loader.stopLoader();
        this.toast.presentToast(res.message);
      }
    });
  }

  goToDetailsPageWithThisParams(goToThisPage: string) {
    const params = {
      endParam: goToThisPage,
      loggedInUserLocationId: this.loggedInUserLocationId,
      loggedInUserCaId: this.loggedInUserCaId,
    };
    this.router.navigate(['booking-details'], {
      relativeTo: this.activatedRoute,
      queryParams: params,
    });
  }
}
