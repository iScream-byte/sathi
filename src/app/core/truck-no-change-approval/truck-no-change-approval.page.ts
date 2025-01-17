import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TruckChange_List } from 'src/app/services/Interfaces';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-truck-no-change-approval',
  templateUrl: './truck-no-change-approval.page.html',
  styleUrls: ['./truck-no-change-approval.page.scss'],
})
export class TruckNoChangeApprovalPage implements OnInit {
  hasNetwork: boolean = true;
  userDetails: any = {};
  userId_CA:string=''
  userId:string=''
  roleType: string = '';
  chageRequestList?:TruckChange_List[]
  rejectReason:string=''
  imei:string=''

  rejectThisItem?:TruckChange_List

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
  ) { }

  async ngOnInit() {
    this.loader.showLoader('fetching data...')
    const status = await Network.getStatus();
    if (status.connected) {
      this.hasNetwork = true;
    } else {
      this.hasNetwork = false;
    }
    this.storage.getItem('NSUDloginDetail').then((u) => {
      if (u) {
        this.userDetails = JSON.parse(u);
        this.userId = this.userDetails.userId;
        this.userId_CA = this.userDetails.ca_id;
        this.roleType = this.userDetails.roletype;
        this.getList()
        this.logDeviceInfo()
      }
    });
  }

  logDeviceInfo = async () => {
    const info = await Device.getInfo()
    this.imei=info.model  
  };

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

  getList(){
    const queries = "UserID=" +
    this.userId_CA +
    "&role=" +
    this.roleType +
    "&CustID=&ProdID="
    this.coreServices.GetTruckChangeList(queries).subscribe(res=>{
      if (res.StatusCode == "001") {
        this.chageRequestList = res.TruckChange_List.reverse();
        this.loader.stopLoader()
      }else{
        this.chageRequestList = null;
        this.loader.stopLoader()
        this.toast.presentToast('No Data Found','error')
      }
    })
  }



  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  isOpen = false;

  presentPopover(item,e: Event) {
    this.rejectThisItem=item
    this.popover.event = e;
    this.isOpen = true;
  }

  async presentConfirmAlert(item) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to approve?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.approve(item)
          },
        },
      ],
    });

    await alert.present();
  }  
  
  async presentRejectAlert() {
    if(!this.rejectReason){
      this.toast.presentToast('Please enter valid reason','error')
      return
    }
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to reject?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.reject()
          },
        },
      ],
    });

    await alert.present();
  }

  approve(item){
    this.loader.showLoader()
    const queries = 
          "BookingID=" +
          item.BookingID +
          "&Status=" +
          'Approved' +
          "&truckno=" +
          item.ChangedTrukno +
          "&RoleFlag=" +
          this.roleType +
          "&UserID=" +
          this.userId +
          "&CADeviceID=" +
          this.imei +
          "&Reason=" +
          ''
    this.coreServices.ApproveRejectTruck(queries).subscribe(res=>{
      if (res.StatusCode == "001"){
        this.toast.presentToast("Truck no. successfully approved",'success')
        this.loader.stopLoader()
        setTimeout(() => {
          this.chageRequestList=null
          this.getList()   
        }, 1000);      
      }else{
        this.toast.presentToast("Something went wrong, please try again later!",'error')
        this.loader.stopLoader()
      }      
    })
  }

  reject(){
    this.isOpen=false
    this.loader.showLoader()
    const queries = 
          "BookingID=" +
          this.rejectThisItem.BookingID +
          "&Status=" +
          'Rejected' +
          "&truckno=" +
          this.rejectThisItem.ChangedTrukno +
          "&RoleFlag=" +
          this.roleType +
          "&UserID=" +
          this.userId +
          "&CADeviceID=" +
          this.imei +
          "&Reason=" +
          this.rejectReason
    
    this.coreServices.ApproveRejectTruck(queries).subscribe(res=>{
      if (res.StatusCode == "001"){
        this.toast.presentToast("Truck no. rejected",'success')
        this.loader.stopLoader()
        setTimeout(() => {
          this.chageRequestList=null
          this.getList()   
        }, 1000);      
      }else{
        this.toast.presentToast("Something went wrong, please try again later!",'error')
        this.loader.stopLoader()
      }      
    })

    
  }

}
