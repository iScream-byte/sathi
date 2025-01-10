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
import { BookOrdLst } from 'src/app/services/Interfaces';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {
  queryParams = {
    endParam: '',
    loggedInUserCaId: '',
    loggedInUserLocationId: '',
  };
  bookingSummaryDetailsData: BookOrdLst[]=[]
  noData=null
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
    private acRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.noData=null
    this.loader.showLoader('fetching data...')
    this.acRoute.queryParams.subscribe((p: any) => {
      this.queryParams.endParam = p.endParam;
      this.queryParams.loggedInUserCaId = p.loggedInUserCaId;
      this.queryParams.loggedInUserLocationId = p.loggedInUserLocationId;
      this.getBookingSummaryDetails();
    });
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
  }

  getBookingSummaryDetails() {
    const queries =
      'bookStatus=' +
      this.queryParams.endParam +
      '&LocId=' +
      this.queryParams.loggedInUserLocationId +
      '&CaId=' +
      this.queryParams.loggedInUserCaId;
    this.coreServices.GetBookingSummaryDetails(queries).subscribe((res) => {
      console.log(res.BookOrdLst);
      if (res.Status == 'Success') {
        this.noData=false
        this.bookingSummaryDetailsData = res.BookOrdLst;
        this.loader.stopLoader()
      } else {
        this.noData=true
        this.bookingSummaryDetailsData=[]
        this.toast.presentToast('No data found','error')
        this.loader.stopLoader()
      }
    });
  }
}
