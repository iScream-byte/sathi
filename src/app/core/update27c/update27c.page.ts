import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
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
import * as moment from 'moment';
import { Update27cFormModel } from './../../services/Interfaces';
import { getCurrentDateTime } from 'src/app/utils/myencrypt';

@Component({
  selector: 'app-update27c',
  templateUrl: './update27c.page.html',
  styleUrls: ['./update27c.page.scss'],
})
export class Update27cPage implements OnInit {
  customerName: string;
  customerCode: string;
  hasNetwork: boolean = true;
  userDetails: any = {};
  roleType: string = '';
  selectedCaId: string = '';
  selectedTime: string = '';
  isDatetimeModalOn: boolean = false;
  isChecked: boolean = false;

  dataFor27cForm?: Update27cFormModel = {
    User_ID: '',
    Customer_Code: '',
    Active_Status: '',
    validForm: '',
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
    private alertController: AlertController
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
        this.selectedCaId = this.userDetails.ca_id;
        this.dataFor27cForm.User_ID = this.userDetails.userId;
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

  async openCustomerSelectModal() {
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
  }

  openDatetimeModal() {
    this.isDatetimeModalOn = true;
  }

  onDateTimeChange(event: any) {
    const formattedDate = moment(event.detail.value).format('MMM YYYY');
    this.selectedTime = formattedDate;
  }

  closeDatetimeModal() {    
    if(!this.selectedTime){
      this.selectedTime=moment(new Date()).format('MMM YYYY');
    }
    this.isDatetimeModalOn = false;
  }

  cancelDatetimeModal() {
    this.selectedTime = '';
    this.isDatetimeModalOn = false;
  }

  save() {
    if (!this.customerName) {
      this.toast.presentToast('Please select a customer', 'error');
      return;
    }
    if (!this.selectedTime) {
      this.toast.presentToast('Please select month and year', 'error');
      return;
    }

    if (!this.isChecked) {
      this.toast.presentToast('Please check 27C recieved?', 'error');
      return;
    }

    this.dataFor27cForm.Customer_Code = this.customerCode;
    this.dataFor27cForm.validForm = this.selectedTime;
    this.dataFor27cForm.Active_Status = this.isChecked ? 'Y' : 'N';

    this.loader.showLoader('Saving...');
    // const urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('validForm', this.dataFor27cForm.validForm);
    // urlSearchParams.append('Active_Status', this.dataFor27cForm.Active_Status);
    // urlSearchParams.append('User_ID', this.dataFor27cForm.User_ID);
    // urlSearchParams.append('Customer_Code', this.dataFor27cForm.Customer_Code);
    const body = {
      User_ID:this.dataFor27cForm.User_ID,
      Customer_Code:this.dataFor27cForm.Customer_Code,
      valid_from:this.dataFor27cForm.validForm,
      Active_Status:this.dataFor27cForm.Active_Status,
      DateTime:getCurrentDateTime()
    }
    this.coreServices.Update27CForm(body).subscribe((res) => {
      console.log(res);
      if (res.status == 'Success') {
        this.toast.presentToast(
          `27C status updated for ${this.customerName}`,
          'success'
        );
      } else {
        this.toast.presentToast(`27C already valid for this month`, 'error');
      }
      this.loader.stopLoader();
    },(err:any)=>{
      this.toast.presentToast(`27C already valid for this month`, 'error');
      this.loader.stopLoader();
    });
  }
}
