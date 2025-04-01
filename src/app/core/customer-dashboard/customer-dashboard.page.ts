import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {
  CAListResponseModel,
  ProductListArrayModel,
  ProductPriceArrayModel,
  SourceListArrayModel,
} from 'src/app/services/Interfaces';
import { Network } from '@capacitor/network';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';
import { SourceResponseModel } from './../../services/Interfaces';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.page.html',
  styleUrls: ['./customer-dashboard.page.scss'],
})
export class CustomerDashboardPage implements OnInit {
  hasNetwork: boolean = null;
  userDetails: any = {};
  roleType: string = '';
  boolHasCAResponseYes: boolean = false;
  boolHasCAResponseNo: boolean = true;
  caListResponse?: [CAListResponseModel];
  ca?: string;
  selectedCaId: string = '';
  selectedLocId: string = '';
  selectedProductId: string = '';
  customerCode: string = '';
  customerName: string = '';
  sourceListResponse?: [SourceListArrayModel];
  selectedSourceId: string = '';
  productListResponse?: [ProductListArrayModel];
  productPriceResponse?: [ProductPriceArrayModel] = null;
  constructor(
    private menuController: MenuController,
    private router: Router,
    private platform: Platform,
    private location: Location,
    private storage: LocalStorageService,
    private loader: MyLoader,
    private toast: ToastService,
    private dropdownService: DropdownService,
    private modalController: ModalController,
    private activatedRoute : ActivatedRoute
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
        if (this.roleType != 'TSL') {
          this.selectedCaId = this.userDetails.ca_id;
          this.selectedLocId = this.userDetails.Loc_ID;
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
      console.log(res);
      
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
    this.selectedSourceId = '';
    this.selectedProductId = '';
    this.sourceListResponse = null;
    this.productPriceResponse = null;
    this.productListResponse = null;
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
      this.loader.showLoader('fetching source...');
      this.dropdownService
        .GetSourceListByCustomerCode(`CustomerCode=${this.customerCode}`)
        .subscribe((res) => {
          if (res.Status == 'Success') {
            this.sourceListResponse = res.SourceLst;
            this.loader.stopLoader();
          } else {
            this.sourceListResponse = null;
            this.loader.stopLoader();
          }
        });
    } else {
      this.toast.presentToast('Please select a CA', 'error');
    }
  }

  onSourceSelected(event: any) {
    this.selectedProductId = '';
    this.productPriceResponse = null;
    this.selectedSourceId = event.detail.value;
    if (!this.selectedSourceId) {
      this.toast.presentToast('Please select a source', 'error');
      return;
    }
    this.loader.showLoader('fetching products...');
    this.dropdownService
      .GetProductPriceBySourceId(
        'SourceId=' +
          this.selectedSourceId +
          '&LocId=' +
          this.userDetails.Loc_ID
      )
      .subscribe((res) => {
        this.loader.stopLoader();
        if (res.Status == 'Success') {
          this.productListResponse = res.ProdList;
        } else {
          this.toast.presentToast('No products found', 'error');
        }
      });
  }

  getCaId(val: any) {
    let ca: any = val.target.value;
    if (ca.CA_ID == undefined) {
      this.selectedCaId = '';
      this.selectedLocId = '';
    } else {
      this.selectedCaId = ca.CA_ID;
      this.selectedLocId = ca.Loc_ID;
    }
    this.customerCode = '';
    this.customerName = '';
    this.selectedSourceId = '';
    this.selectedProductId = '';
    this.sourceListResponse = null;
    this.productPriceResponse = null;
    this.productListResponse = null;
  }

  onProductSelected(e: any) {
    this.loader.showLoader('fetching price...');
    this.selectedProductId = e.target.value;
    const queries =
      'SourceId=' +
      this.selectedSourceId +
      '&LocId=' +
      this.selectedLocId +
      '&ProdId=' +
      this.selectedProductId +
      '&CustomerCode=' +
      this.customerCode;
    this.dropdownService.GetFinalProductPrice(queries).subscribe((res) => {
      if (res.Status == 'Success') {
        this.productPriceResponse = res.ProdPriceLst;
        this.loader.stopLoader();
      } else {
        this.toast.presentToast('No data found', 'error');
        this.productPriceResponse = null;
        this.loader.stopLoader();
      }
    });
  }

  proceed(){
    const params = {
      CustomerCode: this.customerCode,
      LocId: this.selectedLocId,
      ProdId: this.selectedProductId,
      SourceId: this.selectedSourceId
    };
    this.router.navigate(['customer-dashboard-details'], {
      relativeTo: this.activatedRoute,
      queryParams: params,
    });
  }
}
