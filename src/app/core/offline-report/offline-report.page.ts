import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { CoreService } from 'src/app/services/core.service';
import {
  CAListResponseModel,
  DailyResponseArray,
  DailyVisitReportSearchModel,
} from 'src/app/services/Interfaces';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';
import { Network } from '@capacitor/network';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { CapacitorHttp } from '@capacitor/core';
import { configs } from 'src/environments/configs';

@Component({
  selector: 'app-offline-report',
  templateUrl: './offline-report.page.html',
  styleUrls: ['./offline-report.page.scss'],
})
export class OfflineReportPage implements OnInit {
  hasNetwork: boolean = false;
  userDetails: any;
  roleType: string = '';
  userId: string = '';
  offlineReports: any = [];
  AllReports: any = [];
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
    private toast: ToastService
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
        this.userId = this.userDetails.userId;
      }
    });

    // this.storage.getItem('offlineData').then((res) => {
    //   let records = [];
    //   for (let i of res) {
    //     if (i.CreatedBY == this.userDetails.userId) {
    //       records.push(i);
    //     }
    //   }
    //   this.offlineReports = records;
    //   this.AllReports = res;
    //   console.log(this.offlineReports);
    // });
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
  }

  syncWithServer(item, i) {
    if (!this.hasNetwork) {
      this.toast.presentToast('Not Connected to network', 'error');
      return;
    }
    this.loader.showLoader();

    // this.coreServices.SaveCustomerReport(item).subscribe(
    //   (res: any) => {
    //     if (res.status == 'Success') {
    //       this.offlineReports.splice(i, 1);
    //       console.log(this.offlineReports);
    //       this.storage
    //         .setItem('offlineData', this.offlineReports)
    //         .then((res) => {});

    //       this.loader.stopLoader();
    //     } else {
    //       this.loader.stopLoader();
    //     }
    //   },
    //   (err) => {
    //     this.AllReports.splice(i, 1);
    //     // console.log(this.offlineReports);
    //     // console.log(this.AllReports);

    //     this.storage.setItem('offlineData', this.AllReports).then((res) => {});

    //     this.toast.presentToast('Something went wrong', 'error');
    //     this.loader.stopLoader();
    //   }
    // );

    const body = item;

    let params = {
      Visit_ID: body.Visit_ID,
      sysuser_id: body.sysuser_id,
      sysuser_pwd: body.sysuser_pwd,
      CA_ID: body.CA_ID,
      AgencyName: body.AgencyName,
      Agent_ID: body.Agent_ID,
      AgentName: body.AgentName,
      ORG_ID: body.ORG_ID,
      District_ID: body.District_ID,
      DistrictName: body.DistrictName,
      Visit_Date: body.Visit_Date,
      //'Visit_Date': "",
      Visit_Customer_Name: body.Visit_Customer_Name,
      Customer_Code: body.Customer_Code,
      Location: body.Location,
      Product_Manufactured: body.Product_Manufactured,
      Current_Firing_Plan_monthly_avg: body.Current_Firing_Plan_monthly_avg,
      Last_Year_Firing_Plan_monthly_avg: body.Last_Year_Firing_Plan_monthly_avg,

      /* 'Closing_Month': body.Closing_Month, */
      noOfRoundsInSeason: body.noOfRoundsInSeason,
      CategoryID: body.CategoryID,
      CategoryName: body.CategoryName,
      /* 'Firing_Month': body.Firing_Month, */
      Paya: body.Paya,
      PayaChamber: body.PayaChamber,
      NoOfBircksPerRound: body.NoOfBircksPerRound,
      CoalRequirementInSeason: body.CoalRequirementInSeason,
      QuantityManufacturedAnnual: body.QuantityManufacturedAnnual,
      QuantityRequiredAnnual: body.QuantityRequiredAnnual,
      InventoryOfCoal: body.InventoryOfCoal,
      Requirements: body.Requirements,
      Ghato_Usage: body.Ghato_Usage,
      Competition: body.Competition,
      LandedPriceCompetitionCoal: body.LandedPriceCompetitionCoal,
      Avg_price_perThousand_bricks: body.Avg_price_perThousand_bricks,

      Number_of_kilns_in_Visinity: body.Number_of_kilns_in_Visinity,
      Inventory_Prepared_Bricks: body.Inventory_Prepared_Bricks,
      Inventory_Raw_Bricks: body.Inventory_Raw_Bricks,
      Remarks: body.Remarks,
      LAT: body.LAT,
      LONG: body.LONG,
      CreatedDate: body.CreatedDate,
      //'CreatedBY': (body.CreatedBY == null) ? "" : body.CreatedBY,
      CreatedBY: body.AgentName,
      UpdateDate: body.UpdateDate,
      UpdatedBY: body.UpdatedBY,
      // 'status': (body.status == null) ? "" : body.status,
      status: '',
      message: body.message,
      fromDate: body.fromDate,
      toDate: body.toDate,

      FileNamePAN: body.FileNamePAN,
      FilePANPath: body.FilePANPath,
      filebytePAN: body.filebytePAN,

      FileNameADHAR: body.FileNameADHAR,
      FileADHARPath: body.FileADHARPath,
      filebyteADHAR: body.filebyteADHAR,

      FileNameTRLICENSE: body.FileNameTRLICENSE,
      FileTRLICENSEPath: body.FileTRLICENSEPath,
      filebyteTRLICENSE: body.filebyteTRLICENSE,

      //New Addition 28-11-2022 Raman
      BrickKiln: body.BrickKiln,
      BlockName: body.BlockName,
      OwnerName: body.OwnerName,
      CHAMBER: body.CHAMBER,
      Alternatephonenumber: body.Alternatephonenumber,
      Registerednumber: body.Registerednumber,
      ProprietorName: body.ProprietorName,
      PropritorPhoneNo: body.PropritorPhoneNo,
      YearOfEstablishment: body.YearOfEstablishment,
      IndustryType: body.IndustryType,
      ExpectedDateForConversion: body.ExpectedDateForConversion,
      CoalRequirementPerRoundMT: body.CoalRequirementPerRoundMT,
      RequirementOfCoalinBalanceDaysOfSessionMT:
        body.RequirementOfCoalinBalanceDaysOfSessionMT,
      VisitType: body.VisitType,
      VisitMode: body.VisitMode,
      VisitTypeOthers: body.VisitTypeOthers,
      CurrentYearFiringPlanStartMonthAndYear:
        body.CurrentYearFiringPlanStartMonthAndYear,
      CurrentYearFiringPlanCloseMonthAndYear:
        body.CurrentYearFiringPlanCloseMonthAndYear,
      LastYearFiringPlanStartMonthAndYear:
        body.LastYearFiringPlanStartMonthAndYear,
      LastYearFiringPlanCloseMonthAndYear:
        body.LastYearFiringPlanCloseMonthAndYear,

      FileNameCTO: body.FileNameCTO,
      FileCTOPath: body.FileCTOPath,
      filebyteCTO: body.filebyteCTO,

      FileNameJIMMS: body.FileNameJIMMS,
      FileJIMMSPath: body.FileJIMMSPath,
      filebyteJIMMS: body.filebyteJIMMS,

      OtherName: body.OtherName,
      FileNameOthers: body.FileNameOthers,
      FileOthersPath: body.FileOthersPath,
      filebyteOthers: body.filebyteOthers,

      OtherName1: body.OtherName1,
      FileNameOthers1: body.FileNameOthers1,
      FileOthersPath1: body.FileOthersPath1,
      filebyteOthers1: body.filebyteOthers1,
    };

    CapacitorHttp.request({
      method: 'POST',
      url: configs.apiBase + 'CustomerVisitWithFileUploadEntry',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
      .then((res) => {
        if (res.data.status == 'Success') {
          this.offlineReports.splice(i, 1);
          this.toast.presentToast('Report synced with server', 'success');
          this.storage
            .setItem('offlineData', this.offlineReports)
            .then((res) => {
              this.router.navigate(['landing-page']);
            });

          this.loader.stopLoader();
        } else {
          this.toast.presentToast('Something went wrong', 'error');
          this.loader.stopLoader();
        }
      })
      .catch((err) => {
        this.toast.presentToast('something went wrong', 'error');
        this.loader.stopLoader();
      });
  }

  goToDetails(item) {
    this.router.navigate([
      'offline-report',
      'details',
      { data: JSON.stringify(item) },
    ]);
  }
}
