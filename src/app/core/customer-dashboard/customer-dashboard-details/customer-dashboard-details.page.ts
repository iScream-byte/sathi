import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { CustDashArrayModel, CustDashResposneModel } from 'src/app/services/Interfaces';
import { ToastService } from 'src/app/services/toast.service';

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
    const queries =
      'CustomerCode=' +
      this.paramsFromPreviousPage.CustomerCode +
      '&SourceId=' +
      this.paramsFromPreviousPage.SourceId +
      '&LocId=' +
      this.paramsFromPreviousPage.LocId +
      '&ProdId=' +
      this.paramsFromPreviousPage.ProdId;
    this.coreServices.GetCustomerDashboardDetails(queries).subscribe(res=>{
      if(res.Status=='Success'){
        this.custDashArrayResponse = res.CustDashList;
        this.custDashJsonResponse = res;
        this.loader.stopLoader()
      }else{
        this.custDashArrayResponse = null;
        this.loader.stopLoader()
        this.toaster.presentToast('No Data found','error')
      }
      
    })
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
  }
}
