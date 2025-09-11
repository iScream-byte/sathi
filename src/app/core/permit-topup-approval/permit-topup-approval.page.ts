import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
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
import { CapacitorHttp } from '@capacitor/core';
import { configs } from 'src/environments/configs';
import { getCurrentDateTime } from 'src/app/utils/myencrypt';

@Component({
  selector: 'app-permit-topup-approval',
  templateUrl: './permit-topup-approval.page.html',
  styleUrls: ['./permit-topup-approval.page.scss'],
})
export class PermitTopupApprovalPage implements OnInit {
  hasNetwork: boolean = true;
  userDetails: any = {};
  roleType: string = '';
  locId: string = '';
  agentId: string = '';
  topupListArray:any=[]
  nodatafound:boolean=null
  dataForApproveReject:any
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
    private modalController: ModalController,
    private alertCtrl:AlertController
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
        this.getList();
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

  getList() {
    this.loader.showLoader('fetching records...');
    this.coreServices.GetTopUpsForClientApprovalList().subscribe((res) => {
      this.topupListArray = res.permitList;
      if (this.topupListArray.length > 0) {
        this.nodatafound = false;
        this.loader.stopLoader()
      } else {
        this.nodatafound = true;
        this.loader.stopLoader()
      }
    },(err:any)=>{
        this.nodatafound = true;
        this.loader.stopLoader()
    });
  }


  btnApproverejectModal(type, data) {
    console.log("type---->" + type);
    this.showPrompt(type, data);
  }


  async showPrompt(type: string, item: any) {
    const alert = await this.alertCtrl.create({
      header: type,
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Enter Reason',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {          
          },
        },
        {
          text: type,
          handler: async (data) => {
            let status = type === 'Approve' ? 'A' : 'R';

            console.log('Type: ', type);
            console.log('Reason: ', data.reason);

            if (data.reason === '' && type === 'Reject') {
              this.toast.presentToast('Please enter reason','error')
              return;
            }

            try {
             
              this.dataForApproveReject = {
                TopUp_ID: item.TopUp_ID,
                Limit_ID: item.Limit_ID,
                Customer_Code: item.Customer_Code,
                PermitTopUpApplied: item.PermitTopUpApplied,
                TopUpStatus: status,
                CreatedBy: this.userDetails.name,
                Remarks: data.reason,
                // CustomerName: item.CustomerName,
                // CAName: item.CAName,
                DateTime:getCurrentDateTime()

              };
              
              this.loader.showLoader()
              
              this.coreServices.TopUpApproveReject(this.dataForApproveReject).subscribe(res=>{
                console.log(res);
                this.toast.presentToast(res.message)
                this.loader.stopLoader()
                setTimeout(() => {
                  this.getList()
                }, 1000);
              },err=>{
                console.log(err);
                this.loader.stopLoader()                
              })

              // let params = {
              //   TopUp_ID: this.dataForApproveReject.TopUp_ID,
              //   Limit_ID: this.dataForApproveReject.Limit_ID,
              //   Customer_Code: this.dataForApproveReject.Customer_Code,
              //   PermitTopUpApplied: this.dataForApproveReject.PermitTopUpApplied,
              //   TopUpStatus: this.dataForApproveReject.TopUpStatus,
              //   CreatedBy: this.dataForApproveReject.CreatedBy,
              //   Remarks: this.dataForApproveReject.Remarks,
              //   CustomerName: this.dataForApproveReject.CustomerName,
              //   CAName: this.dataForApproveReject.CAName,
              // };


              // CapacitorHttp.request({
              //   method: 'POST',
              //   url: configs.apiBase+'TopUpApplyApproved',
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              //   data: params,
              // }).then(res=>{
              //   if (res) {
              //         this.toast.presentToast(res.data.message,'success')
              //         this.loader.stopLoader()
              //         setTimeout(() => {
              //           this.getList()
              //         }, 1000);                      
              //   }else{
              //     this.toast.presentToast('something went wrong', 'error');
              //     this.loader.stopLoader()  
              //   }                
              // }).catch(err=>{
              //   this.toast.presentToast('something went wrong', 'error');
              //   this.loader.stopLoader()  
              // })

            } catch (error) {
              console.error('Error: ', error);              
            }
          },
        },
      ],
    });

    await alert.present(); // Show the alert
  }



  
}
