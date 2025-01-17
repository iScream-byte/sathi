import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {
  CAListResponseModel,
  PermitListArray,
} from './../../services/Interfaces';
import { Network } from '@capacitor/network';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from './../../shared/MyLoader';
import { ToastService } from './../../services/toast.service';
import { DropdownService } from './../../services/dropdown.service';
import { SearchableDropdownComponent } from './../../utils/searchable-dropdown/searchable-dropdown.component';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-view-topup-permit',
  templateUrl: './view-topup-permit.page.html',
  styleUrls: ['./view-topup-permit.page.scss'],
})
export class ViewTopupPermitPage implements OnInit {
  hasNetwork: boolean = true;
  userDetails: any = {};
  roleType: string = '';
  locId: string = '';
  agentId: string = '';
  caListResponse?: [CAListResponseModel];
  boolHasCAResponseYes: boolean = false;
  boolHasCAResponseNo: boolean = true;
  ca?: string;
  customerName: string = '';
  customerCode: string = '';
  selectedCaId: string = '';
  productData: any = [];
  selectedProductId: string = '';
  topupListArray?: PermitListArray[];
  topupValue: string;
  showSubmitBtn: boolean = false;
  constructor(
    private menuController: MenuController,
    private router: Router,
    private platform: Platform,
    private location: Location,
    private storage: LocalStorageService,
    private loader: MyLoader,
    private toast: ToastService,
    private dropdownServices: DropdownService,
    private coreServices: CoreService,
    private modalController: ModalController
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
        this.locId = this.userDetails.Loc_ID;
        if (this.roleType != 'TSL') {
          this.selectedCaId = this.userDetails.ca_id;
          this.agentId = this.userDetails.agent_id;
        } else {
          this.getCAList();
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

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }

  getCaId(val) {
    let ca: any = val.target.value;
    if (ca.CA_ID == undefined) {
      this.selectedCaId = '';
    } else {
      this.selectedCaId = ca.CA_ID;
    }
    this.customerCode = '';
    this.customerName = '';
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
    this.dropdownServices.GetCAList().subscribe((res) => {
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

  async openCustomerSelectModal() {
    if (!this.selectedCaId) {
      this.toast.presentToast('Please select a CA', 'error');
      return;
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
    if (this.customerCode) {
      this.getSourceList(this.customerCode);
    }
  }

  getSourceList(customerCode) {
    this.loader.showLoader('fetching product list...');
    this.productData = [];
    this.selectedProductId = '';
    this.dropdownServices
      .GetSourceListByCustomerCode(`CustomerCode=${customerCode}`)
      .subscribe((res) => {
        if (res.Status == 'Success') {
          this.getProductList(res.SourceLst[0].SourceID);
        }
      });
  }

  getProductList(sourceId) {
    this.dropdownServices
      .GetProductPriceBySourceId(
        'SourceId=' + sourceId + '&LocId=' + this.locId
      )
      .subscribe((res) => {
        if (res.Status == 'Success') {
          this.productData = res.ProdList;
          this.loader.stopLoader();
        } else {
          this.productData = [];
          this.loader.stopLoader();
        }
      });
  }

  applyOrViewPermit() {
    this.loader.showLoader('fetching records...');
    const queryString = `caid=${this.selectedCaId}&CustomerCode=${this.customerCode}&ProdId=${this.selectedProductId}`;
    this.coreServices.GetTopUpPermitList(queryString).subscribe((res) => {
      if (res.Status == 'Success') {
        this.topupListArray = res.permitList;
        this.loader.stopLoader();
      } else {
        this.topupListArray = [];
        this.loader.stopLoader();
        this.toast.presentToast(
          'No Available Permit for the month, Please contact MJ Team',
          'error'
        );
      }
    });
  }

  valueChange(idx, val) {
    if (!this.topupValue) {
      this.showSubmitBtn = false;
      return;
    }
    const PermitQuantity = Number(val.PermitQuantity);
    const topval = Number(this.topupValue);

    if(topval<0){
      return
    }
    
    if (topval <= PermitQuantity) {
      this.showSubmitBtn = true;
    } else {
      this.showSubmitBtn = false;
    }
  }

  save() {
    var BalanceQuantity = Number(this.topupListArray[0].BalanceQuantity);
    var topupValue = Number(this.topupValue);
    console.log(BalanceQuantity, topupValue);

    if (topupValue >= BalanceQuantity) {
      this.toast.presentToast('Not Allowed', 'error');
      return;
    }

    if (!topupValue) {
      this.toast.presentToast('Please enter topup value', 'error');
      return;
    }

    this.loader.showLoader('Updating...');

    const body = {
      AgentId: this.agentId,
      caid: this.selectedCaId,
      CustomerCode: this.customerCode,
      CustomerName: this.customerName,
      PermitTopUpApplied: topupValue,
      productid: this.selectedProductId,
    };

    let queryString = `AgentId=${body.AgentId}&caid=${body.caid}&CustomerCode=${body.CustomerCode}&CustomerName=${body.CustomerName}&PermitTopUpApplied=${body.PermitTopUpApplied}&ProductId=${body.productid}`;

    console.log(queryString);

    this.coreServices.UpdateTopUpQuantity(queryString).subscribe((res) => {
      console.log(res);
      if (res.Permit_Status == 'Success') {
        this.loader.stopLoader();
        this.toast.presentToast(res.message, 'success');
      } else {
        this.loader.stopLoader();
        this.toast.presentToast(
          'Failed to update top up limit. Please try again.',
          'error'
        );
      }
    });
  }
}
