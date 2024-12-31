import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configs } from './../../environments/configs';
import { VisitReportResponseModel, VisitReportSaveModel } from './Interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private http: HttpClient) {}

  GetCustomerDetails(customerCode) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('CustomerCode', customerCode);
    return this.http.get<VisitReportResponseModel>(
      configs.apiBase + 'GetVisitByCustomerCode?' + urlSearchParams
    );
  }

  GetCustomerDetailsAgain(customerCode) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('CustomerCode', customerCode);
    return this.http.get<VisitReportResponseModel>(
      configs.apiBase +
        'GetExistCustomerDetailsByCustomerCode?' +
        urlSearchParams
    );
  }

  SaveCustomerReport(body: VisitReportSaveModel) {
    let params = {
      'Visit_ID': body.Visit_ID,
      'sysuser_id': body.sysuser_id,
      'sysuser_pwd': body.sysuser_pwd,
      'CA_ID': body.CA_ID,
      'AgencyName': body.AgencyName,
      'Agent_ID': body.Agent_ID,
      'AgentName': body.AgentName,
      'ORG_ID': body.ORG_ID,
      'District_ID': body.District_ID,
      'DistrictName': body.DistrictName,
      'Visit_Date': body.Visit_Date,
      //'Visit_Date': "",
      'Visit_Customer_Name': body.Visit_Customer_Name,
      'Customer_Code': body.Customer_Code,
      'Location': body.Location,
      'Product_Manufactured': body.Product_Manufactured,
      'Current_Firing_Plan_monthly_avg': body.Current_Firing_Plan_monthly_avg,
      'Last_Year_Firing_Plan_monthly_avg': body.Last_Year_Firing_Plan_monthly_avg,

      /* 'Closing_Month': body.Closing_Month, */
      'noOfRoundsInSeason': body.noOfRoundsInSeason,
      'CategoryID': body.CategoryID,
      'CategoryName': body.CategoryName,
      /* 'Firing_Month': body.Firing_Month, */
      'Paya': body.Paya,
      'PayaChamber': body.PayaChamber,
      'NoOfBircksPerRound': body.NoOfBircksPerRound,
      'CoalRequirementInSeason': body.CoalRequirementInSeason,
      'QuantityManufacturedAnnual': body.QuantityManufacturedAnnual,
      'QuantityRequiredAnnual': body.QuantityRequiredAnnual,
      'InventoryOfCoal': body.InventoryOfCoal,
      'Requirements': body.Requirements,
      'Ghato_Usage': body.Ghato_Usage,
      'Competition': body.Competition,
      'LandedPriceCompetitionCoal': body.LandedPriceCompetitionCoal,
      'Avg_price_perThousand_bricks': body.Avg_price_perThousand_bricks,

      'Number_of_kilns_in_Visinity': body.Number_of_kilns_in_Visinity,
      'Inventory_Prepared_Bricks': body.Inventory_Prepared_Bricks,
      'Inventory_Raw_Bricks': body.Inventory_Raw_Bricks,
      'Remarks': body.Remarks,
      'LAT': body.LAT,
      'LONG': body.LONG,
      'CreatedDate': body.CreatedDate,
      //'CreatedBY': (body.CreatedBY == null) ? "" : body.CreatedBY,
      'CreatedBY': body.AgentName,
      'UpdateDate': body.UpdateDate,
      'UpdatedBY': body.UpdatedBY,
      // 'status': (body.status == null) ? "" : body.status,
      'status': "",
      'message': body.message,
      'fromDate': body.fromDate,
      'toDate': body.toDate,


      'FileNamePAN': body.FileNamePAN,
      'FilePANPath': body.FilePANPath,
      'filebytePAN': body.filebytePAN,

      'FileNameADHAR': body.FileNameADHAR,
      'FileADHARPath': body.FileADHARPath,
      'filebyteADHAR': body.filebyteADHAR,

      'FileNameTRLICENSE': body.FileNameTRLICENSE,
      'FileTRLICENSEPath': body.FileTRLICENSEPath,
      'filebyteTRLICENSE': body.filebyteTRLICENSE,

      //New Addition 28-11-2022 Raman
      'BrickKiln': body.BrickKiln,
      'BlockName': body.BlockName,
      'OwnerName': body.OwnerName,
      'CHAMBER': body.CHAMBER,
      'Alternatephonenumber': body.Alternatephonenumber,
      'Registerednumber': body.Registerednumber,
      'ProprietorName': body.ProprietorName,
      'PropritorPhoneNo': body.PropritorPhoneNo,
      'YearOfEstablishment': body.YearOfEstablishment,
      'IndustryType': body.IndustryType,
      'ExpectedDateForConversion': body.ExpectedDateForConversion,
      'CoalRequirementPerRoundMT': body.CoalRequirementPerRoundMT,
      'RequirementOfCoalinBalanceDaysOfSessionMT': body.RequirementOfCoalinBalanceDaysOfSessionMT,
      'VisitType': body.VisitType,
      'VisitMode': body.VisitMode,
      'VisitTypeOthers': body.VisitTypeOthers,
      'CurrentYearFiringPlanStartMonthAndYear': body.CurrentYearFiringPlanStartMonthAndYear,
      'CurrentYearFiringPlanCloseMonthAndYear': body.CurrentYearFiringPlanCloseMonthAndYear,
      'LastYearFiringPlanStartMonthAndYear': body.LastYearFiringPlanStartMonthAndYear,
      'LastYearFiringPlanCloseMonthAndYear': body.LastYearFiringPlanCloseMonthAndYear,

      'FileNameCTO': body.FileNameCTO,
      'FileCTOPath': body.FileCTOPath,
      'filebyteCTO': body.filebyteCTO,

      'FileNameJIMMS': body.FileNameJIMMS,
      'FileJIMMSPath': body.FileJIMMSPath,
      'filebyteJIMMS': body.filebyteJIMMS,

      'OtherName': body.OtherName,
      'FileNameOthers': body.FileNameOthers,
      'FileOthersPath': body.FileOthersPath,
      'filebyteOthers': body.filebyteOthers,

      'OtherName1': body.OtherName1,
      'FileNameOthers1': body.FileNameOthers1,
      'FileOthersPath1': body.FileOthersPath1,
      'filebyteOthers1': body.filebyteOthers1
  }
    console.log(params);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      configs.apiBase+'CustomerVisitWithFileUploadEntry',
      params,
      { headers: headers }
    );
  }
}
