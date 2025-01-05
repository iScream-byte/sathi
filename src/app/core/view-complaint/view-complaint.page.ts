import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.page.html',
  styleUrls: ['./view-complaint.page.scss'],
})
export class ViewComplaintPage implements OnInit {
  source: string = '';
  status: string = '';
  isStartDateModalOpen = false;
  isEndDateModalOpen = false;
  selectedStartDateTime: string;
  selectedEndDateTime: string;
  customerName: string;
  customerCode: string;
  searchResults: any = [];
  noData: boolean = null;

  userDetails: any = {};

  constructor(
    private router: Router,
    private platform: Platform,
    private location: Location,
    private menuController: MenuController,
    private modalController: ModalController,
    private storage: LocalStorageService,
    private loader: MyLoader,
    private coreServices: CoreService
  ) {}

  ngOnInit() {
    this.storage.getItem('NSUDloginDetail').then((u) => {
      if (u) {
        this.userDetails = JSON.parse(u);
      }
    });
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.router.navigate(['landing-page']);
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

  async openCustomerSelectModal() {
    let data = {
      CA_ID: this.userDetails.ca_id,
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
  }

  resetFilter() {
    this.customerCode = '';
    this.customerName = '';
    this.selectedStartDateTime = '';
    this.selectedEndDateTime = '';
    this.searchResults = [];
    this.noData = null;
    this.source = '';
    this.status = '';
  }

  search() {}
}
