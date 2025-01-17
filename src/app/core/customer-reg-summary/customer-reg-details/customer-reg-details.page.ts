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
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-customer-reg-details',
  templateUrl: './customer-reg-details.page.html',
  styleUrls: ['./customer-reg-details.page.scss'],
})
export class CustomerRegDetailsPage implements OnInit {
  dataForSummary?:CustomerRegListArray
  isModalOpen:boolean=false
  imageSrc:string=''
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
  ) {
    this.acRoute.queryParams.subscribe(p=>{
      this.dataForSummary=p
    })
   }

  ngOnInit() {
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


  async openInApp() {
    await Browser.open({
      url: 'https://www.google.com/maps/search/?api=1&query='+this.dataForSummary.LAT+','+this.dataForSummary.LONG,
      presentationStyle: 'fullscreen',
    });
  }
  


  closeModal(){
    this.isModalOpen=false
  }



  presentPopover(url:string) {
    this.imageSrc=url
    this.isModalOpen=true
  }
  
}
