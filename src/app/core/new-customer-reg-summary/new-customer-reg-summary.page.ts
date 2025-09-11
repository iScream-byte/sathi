import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';
import { Network } from '@capacitor/network';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { CAListResponseModel, CustomerRegSearchModel, NewRegisteredCustomerForTodayResponseArray, NewRegisteredCustomerForTodaySearch } from 'src/app/services/Interfaces';
import { getCurrentDateTime } from 'src/app/utils/myencrypt';

@Component({
  selector: 'app-new-customer-reg-summary',
  templateUrl: './new-customer-reg-summary.page.html',
  styleUrls: ['./new-customer-reg-summary.page.scss'],
})
export class NewCustomerRegSummaryPage implements OnInit {
  hasNetwork: boolean = null;
  roleType: string = '';
  userDetails: any = {};
  caListResponse?: [CAListResponseModel];
  boolHasCAResponseYes: boolean = false;
  boolHasCAResponseNo: boolean = true;
  districtName: string;
  selectedDistrictId: string = '';
  ca?: string;


  dataForSearch?: NewRegisteredCustomerForTodaySearch = {
    caId: '',
    DistrictId: '',
  };

  searchModel?: NewRegisteredCustomerForTodayResponseArray[];

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
          this.dataForSearch.caId = this.userDetails.ca_id;
        } else {
          this.dataForSearch.caId = '';
          this.getCAList();
        }
      }
    });
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

  getCaId(val) {
    let ca: any = val.target.value;
    if (ca.CA_ID == undefined) {
      this.dataForSearch.caId = '';
    } else {
      this.dataForSearch.caId = ca.CA_ID;
    }
    this.districtName = '';
    this.dataForSearch.DistrictId = '';
  }

  async openDistrictSelectModal() {
    if (!this.dataForSearch.caId) {
      this.toast.presentToast('Please select a CA', 'error');
      return;
    }
    let data = {
      CA_ID: this.dataForSearch.caId,
      modalName: 'district',
    };
    const modal = await this.modalController.create({
      component: SearchableDropdownComponent,
      componentProps: {
        modalData: data,
      },
    });

    modal.present();

    const result = await modal.onDidDismiss();
    this.districtName = result?.data?.DistrictName;
    this.selectedDistrictId = result?.data?.DistrictId;
  }

  resetFilter() {
    if (this.roleType == "TSL") {
      this.ca = null;
      this.dataForSearch.caId = '';
    }

    this.districtName = '';
    this.dataForSearch.DistrictId = '';
    this.searchModel = null;
  }
  



  search() {
    this.loader.showLoader('searching for records...');
    this.dataForSearch.DistrictId = this.selectedDistrictId;
    const queries = {
      CA_ID : this.dataForSearch.caId ,      
      District_ID: this.dataForSearch.DistrictId,
      DateTime:getCurrentDateTime()
    }
    console.log(queries);
    
    this.coreServices.GetNewCustomerRegistrationSummary(queries).subscribe(res=>{
      if(res){
        this.searchModel = res.visitLst        
        this.loader.stopLoader()
      }else{
        // this.searchModel = [{          
        //   sysuser_pwd: 'password123',
        //   CA_ID: 'CA001',
        //   AgencyName: 'ABC Agency',
        //   Agent_ID: 'AGT123',
        //   AgentName: 'John Doe',
        //   ORG_ID: 'ORG987',
        //   District_ID: 'DST456',
        //   DistrictName: 'Central District',
        //   Visit_Date: '2025-01-14',
        //   Visit_Customer_Name: 'XYZ Corp.',
        //   Customer_Code: 'CUST789',
        //   Location: 'New York, USA',
        //   Product_Manufactured: 'Bricks',
        //   Current_Firing_Plan_monthly_avg: '10000',
        //   Last_Year_Firing_Plan_monthly_avg: '9000',
        //   Closing_Month: 'January',
        //   CategoryID: 'CAT001',
        //   CategoryName: 'Building Materials',
        //   Firing_Month: 'January',
        //   noOfRoundsInSeason: '12',
        //   Paya: '5000',
        //   NoOfBircksPerRound: '12000',
        //   CoalRequirementInSeason: '60000',
        //   QuantityManufacturedAnnual: '144000',
        //   QuantityRequiredAnnual: '130000',
        //   InventoryOfCoal: '20000',
        //   Requirements: 'More coal required for next season',
        //   Ghato_Usage: 'High',
        //   Competition: 'Local suppliers',
        //   LandedPriceCompetitionCoal: '350',
        //   Avg_price_perThousand_bricks: '1500',
        //   Number_of_kilns_in_Visinity: '5',
        //   Inventory_Prepared_Bricks: '50000',
        //   Remarks: 'Need to increase coal inventory',
        //   LAT: '40.7128',
        //   LONG: '-74.0060',
        //   CreatedDate: '2025-01-10',
        //   CreatedBY: 'admin',
        //   UpdateDate: '2025-01-14',
        //   UpdatedBY: 'admin',
        //   status: 'Active',
        //   message: 'Visit scheduled for customer meeting',
        //   fromDate: '2025-01-01',
        //   toDate: '2025-12-31',
        //   Visit_ID: 'VST001',
        //   FileNamePAN: 'PAN_card.pdf',
        //   FilePANPath: '/path/to/file/PAN_card.pdf',
        //   filebytePAN: 'base64EncodedString',
        //   FileNameADHAR: 'ADHAR_card.pdf',
        //   FileADHARPath: '/path/to/file/ADHAR_card.pdf',
        //   filebyteADHAR: 'base64EncodedString',
        //   FileNameTRLICENSE: 'Trade_License.pdf',
        //   FileTRLICENSEPath: '/path/to/file/Trade_License.pdf',
        //   filebyteTRLICENSE: 'base64EncodedString',
        // }];
        this.searchModel=null
        this.toast.presentToast('No data found','error')
        this.loader.stopLoader()
      }
      
    },(err:any)=>{
        this.searchModel=null
        this.toast.presentToast('No data found','error')
        this.loader.stopLoader()
    })

  }

  goToDetails(data){    
    this.router.navigate(['new-customer-reg-details'], {
      relativeTo: this.acRoute,
      queryParams: data,
    });
    
  }

}
