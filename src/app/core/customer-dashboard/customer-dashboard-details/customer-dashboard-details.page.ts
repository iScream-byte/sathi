import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { CustDashArrayModel, CustDashResposneModel } from 'src/app/services/Interfaces';
import { ToastService } from 'src/app/services/toast.service';
import { getCurrentDateTime } from 'src/app/utils/myencrypt';

@Component({
  selector: 'app-customer-dashboard-details',
  templateUrl: './customer-dashboard-details.page.html',
  styleUrls: ['./customer-dashboard-details.page.scss'],
})
export class CustomerDashboardDetailsPage implements OnInit {
  paramsFromPreviousPage: any = {};
  custDashArrayResponse?: [CustDashArrayModel];
  public custDashJsonResponse: CustDashResposneModel = {
    CustName: '',
    TIN_NO: '',
    GST_NO: '',
    CustAdd: ''
  }
  constructor(
    private menuController: MenuController,
    private location: Location,
    private acRoute: ActivatedRoute,
    private coreServices: CoreService,
    private loader:MyLoader,
    private  toaster:ToastService
  ) {
    this.acRoute.queryParams.subscribe((p) => {
      this.paramsFromPreviousPage = p;
    });
  }

  ngOnInit() {
    this.loader.showLoader('fetching details...')
  }

  ionViewDidEnter() {
    const body = {
      Customer_Code:this.paramsFromPreviousPage.CustomerCode,
      SourceID: this.paramsFromPreviousPage.SourceId,
      Loc_ID:this.paramsFromPreviousPage.LocId,
      ProductID:this.paramsFromPreviousPage.ProdId,
      DateTime:getCurrentDateTime()
    }
    this.coreServices.GetCustomerDashboardDetails(body).subscribe(res=>{
      if(res.Status=='Success'){
        this.custDashArrayResponse = res.CustDashList;
        this.custDashJsonResponse = res;
        this.loader.stopLoader()
      }else{
        this.custDashArrayResponse = null;
        this.loader.stopLoader()
        this.toaster.presentToast('No Data found','error')
      }      
    },(err:any)=>{
        this.custDashArrayResponse = null;
        this.loader.stopLoader()
        this.toaster.presentToast('No Data found','error')
    })
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
  }
}
