export interface LoginRequestModel {
  username?: string;
  password?: string;
}
export interface LoginResponseModel {
  RoleName?: string;
  name?: string;
  agent_id?: string;
  ca_id?: string;
  Org_ID?: string;
  sysuser_id?: string;
  sysuser_pwd?: string;
  new_pwd?: string;
  status?: string;
  message?: string;
  roletype?: string;
  userId?: string;
  Loc_ID?: string;
  Location?: string;
}

export interface VisitReportSaveModel {
  Visit_ID?: string;
  sysuser_id?: string;
  sysuser_pwd?: string;
  CA_ID?: string;
  AgencyName?: string;
  Agent_ID?: string;
  AgentName?: string;
  ORG_ID?: string;
  District_ID?: string;
  DistrictName?: string;
  Visit_Date?: string;
  ProprietorName?: string;
  PropritorPhoneNo?: string;
  YearOfEstablishment?: string;
  Visit_Customer_Name?: string;
  VisitType?: string;
  VisitMode?: string;
  NetworkMode?: string;
  VisitTypeOthers?: string;
  Customer_Code?: string;
  Location?: string;
  Product_Manufactured?: string;
  Current_Firing_Plan_monthly_avg?: string;
  Last_Year_Firing_Plan_monthly_avg?: string;
  LastYearFiringPlanCloseMonthAndYear?: string;
  LastYearFiringPlanStartMonthAndYear?: string;
  CurrentYearFiringPlanCloseMonthAndYear?: string;
  CurrentYearFiringPlanStartMonthAndYear?: string;
  BlockName?: string;
  OwnerName?: string;
  DocType?: string;
  OtherName?: string;
  OtherName1?: string;
  Ownerphonenumber?: string;
  Alternatephonenumber?: string;
  Registerednumber?: string;
  IndustryType?: string;
  noOfRoundsInSeason?: string;
  CategoryID?: string;
  CategoryName?: string;
  Last_Year_Firing_Month?: string;
  Current_Year_Firing_Month?: string;
  ExpectedDateForConversion?: string;
  BrickKiln?: string;
  Paya?: string;
  CHAMBER?: string;
  PayaChamber?: string;
  NoOfBircksPerRound?: string;
  CoalRequirementInSeason?: string;
  CoalRequirementPerRoundMT?: string;
  RequirementOfCoalinBalanceDaysOfSessionMT?: string;
  QuantityManufacturedAnnual?: string;
  QuantityRequiredAnnual?: string;
  QuantityRequiredInBalanceDays?: string;
  InventoryOfCoal?: string;
  Requirements?: string;
  Ghato_Usage?: string;
  Competition?: string;
  LandedPriceCompetitionCoal?: string;
  Avg_price_perThousand_bricks?: string;

  Number_of_kilns_in_Visinity?: string;
  Inventory_Prepared_Bricks?: string;
  Inventory_Raw_Bricks?: string;
  Remarks?: string;
  LAT?: string;
  LONG?: string;
  CreatedDate?: string;
  CreatedBY?: string;
  UpdateDate?: string;
  UpdatedBY?: string;
  status?: string;
  message?: string;
  fromDate?: string;
  toDate?: string;
  Closing_Month?: string;
  Firing_Month?: string;
  FileNamePAN?: string;
  FilePANPath?: string;
  filebytePAN?: string;

  FileNameADHAR?: string;
  FileADHARPath?: string;
  filebyteADHAR?: string;

  FileNameTRLICENSE?: string;
  FileTRLICENSEPath?: string;
  filebyteTRLICENSE?: string;

  FileNameCTO?: string;
  FileCTOPath?: string;
  filebyteCTO?: string;

  FileNameJIMMS?: string;
  FileJIMMSPath?: string;
  filebyteJIMMS?: string;

  FileNameOthers?: string;
  FileOthersPath?: string;
  filebyteOthers?: string;

  FileNameOthers1?: string;
  FileOthersPath1?: string;
  filebyteOthers1?: string;
}

export interface Comp {
  CA_ID?: any;
  Customer_Code?: string;
  CustomerName?: string;
  Complain?: any;
  ComplaintDate?: any;
  Response?: any;
  Status?: any;
  fromDate?: any;
  toDate?: any;
  message?: any;
}

export interface ComplaintsCustomerList {
  comps?: Comp[];
  Status?: string;
}

export interface VisitReportResponseModel {
  sysuser_id?: any;
  sysuser_pwd?: any;
  CA_ID?: string;
  AgencyName?: any;
  Agent_ID?: string;
  AgentName?: any;
  ORG_ID?: string;
  District_ID?: string;
  DistrictName?: string;
  Visit_Date?: string;
  ProprietorName?: string;
  PropritorPhoneNo?: string;
  YearOfEstablishment?: string;
  Visit_Customer_Name?: string;
  Customer_Code?: string;
  Location?: string;
  Product_Manufactured?: string;
  Current_Firing_Plan_monthly_avg?: string;
  Last_Year_Firing_Plan_monthly_avg?: string;
  LastYearFiringPlanCloseMonthAndYear?: string;
  LastYearFiringPlanStartMonthAndYear?: string;
  CurrentYearFiringPlanCloseMonthAndYear?: string;
  CurrentYearFiringPlanStartMonthAndYear?: string;
  BlockName?: string;
  OwnerName?: string;
  DocType?: string;
  OtherName?: string;
  OtherName1?: string;
  Ownerphonenumber?: string;
  Alternatephonenumber?: string;
  Registerednumber?: string;
  noOfRoundsInSeason?: string;
  Paya?: string;
  CHAMBER?: string;
  PayaChamber?: string;
  BrickKiln?: string;
  NoOfBircksPerRound?: string;
  CoalRequirementInSeason?: string;
  CoalRequirementPerRoundMT?: string;
  RequirementOfCoalinBalanceDaysOfSessionMT?: string;
  QuantityManufacturedAnnual?: string;
  QuantityRequiredAnnual?: string;
  QuantityRequiredInBalanceDays?: string;
  InventoryOfCoal?: string;
  Requirements?: string;
  Ghato_Usage?: string;
  Competition?: string;
  LandedPriceCompetitionCoal?: string;
  Avg_price_perThousand_bricks?: string;
  Number_of_kilns_in_Visinity?: string;
  Inventory_Prepared_Bricks?: string;
  Inventory_Raw_Bricks?: string;
  Remarks?: string;
  LAT?: string;
  LONG?: string;
  CreatedDate?: string;
  CreatedBY?: string;
  UpdateDate?: string;
  UpdatedBY?: string;
  status?: string;
  message?: string;
  fromDate?: any;
  toDate?: any;
  CategoryID?: any;
  CategoryName?: any;
  Last_Year_Firing_Month?: any;
  Current_Year_Firing_Month?: any;
  ExpectedDateForConversion?: any;
  FileNamePAN?: string;
  FilePANPath?: string;
  filebytePAN?: string;

  FileNameADHAR?: string;
  FileADHARPath?: string;
  filebyteADHAR?: string;

  FileNameTRLICENSE?: string;
  FileTRLICENSEPath?: string;
  filebyteTRLICENSE?: string;

  FileNameCTO?: string;
  FileCTOPath?: string;
  filebyteCTO?: string;

  FileNameJIMMS?: string;
  FileJIMMSPath?: string;
  filebyteJIMMS?: string;

  FileNameOthers?: string;
  FileOthersPath?: string;
  filebyteOthers?: string;

  FileNameOthers1?: string;
  FileOthersPath1?: string;
  filebyteOthers1?: string;
}

export interface VisitReportDistrictResponseModel {
  DistrictId?: string;
  DistrictName?: string;
  CA_Id?: string;
}

export interface DailyVisitReportSearchModel {
  userId?: string;
  CaId?: string;
  fromDate?: any;
  toDate?: any;
  DistrictID?: string;
}

export interface User {
  id: number;
  name: string;
  active: number;
  /* for version 2
    email: string
    */
}

export interface DailyVisitReportSearchModel {
  userId?: string;
  CaId?: string;
  fromDate?: any;
  toDate?: any;
  DistrictID?: string;
}

export interface DailyVisitResponseModel {
  visitLst?: DailyResponseArray[];
  status?: string;
}
export interface DailyResponseArray {
  sysuser_id?: any;
  sysuser_pwd?: any;
  CA_ID?: string;
  AgencyName?: any;
  Agent_ID?: string;
  AgentName?: any;
  ORG_ID?: string;
  District_ID?: string;
  DistrictName?: string;
  Visit_Date?: string;
  Visit_Customer_Name?: string;
  Customer_Code?: string;
  Location?: string;
  Product_Manufactured?: string;
  Current_Firing_Plan_monthly_avg?: string;
  Last_Year_Firing_Plan_monthly_avg?: string;
  Closing_Month?: string;
  CategoryID?: string;
  CategoryName?: string;
  Firing_Month?: string;
  noOfRoundsInSeason?: string;
  Paya?: string;
  NoOfBircksPerRound?: string;
  CoalRequirementInSeason?: string;
  QuantityManufacturedAnnual?: string;
  QuantityRequiredAnnual?: string;
  InventoryOfCoal?: string;
  Requirements?: string;
  Ghato_Usage?: string;
  Competition?: string;
  LandedPriceCompetitionCoal?: string;
  Avg_price_perThousand_bricks?: string;
  Number_of_kilns_in_Visinity?: string;
  Inventory_Prepared_Bricks?: string;
  Remarks?: string;
  LAT?: string;
  LONG?: string;
  CreatedDate?: string;
  CreatedBY?: string;
  UpdateDate?: string;
  UpdatedBY?: string;
  status?: string;
  message?: string;
  fromDate?: any;
  toDate?: any;
  Visit_ID?: string;
  FileNamePAN?: string;
  FilePANPath?: string;
  filebytePAN?: string;
  FileNameADHAR?: string;
  FileADHARPath?: string;
  filebyteADHAR?: string;
  FileNameTRLICENSE?: string;
  FileTRLICENSEPath?: string;
  filebyteTRLICENSE?: string;

  FileNameCTO?: string;
  FileCTOPath?: string;
  filebyteCTO?: string;

  FileNameJIMMS?: string;
  FileJIMMSPath?: string;
  filebyteJIMMS?: string;
  OtherName?: string;
  FileNameOthers?: string;
  FileOthersPath?: string;
  filebyteOthers?: string;
  IndustryType?: string;
}

export interface CAListResponseModel {
  DistrictId?: string;
  CA_Name?: string;
  CA_ID?: string;
  Loc_ID?: string;
  Location?: string;
}

export interface ViewComplaintsSearchModel {
  CaId?: string;
  Customer_Code?: string;
  Status?: string;
  fromDate?: any;
  toDate?: any;
}

export interface ViewComplaintListSearchData {
  CA_ID?: string;
  Customer_Code?: string;
  CustomerName?: string;
  Complain?: string;
  ComplaintDate?: string;
  Response?: string;
  Status?: string;
  fromDate?: any;
  toDate?: any;
  message?: any;
  ResponseDate?: any;
}

export interface ComplaintSearchList {
  comps?: ViewComplaintListSearchData[];
  Status?: string;
}

export interface PaymentListArray {
  Amount?: string;
  CA_ID?: string;
  Customer_Code?: string;
  Customer_Name?: string;
  frmDate?: string;
  message?: string;
  PaymentDate?: string;
  Status?: string;
  toDate?: string;
}

export interface PaymentResponseModel {
  Status?: string;
  paymentLst?: PaymentListArray[];
  TotalPayment?: string;
}

export interface PaymentDataSend {
  formDate?: string;
  CustomerCode?: string;
  caid?: string;
  toDate?: string;
  LocId?: string;
}

export interface PaymentResponseModel {
  Status?: string;
  paymentLst?: PaymentListArray[];
  TotalPayment?: string;
}

export interface PaymentListArray {
  Amount?: string;
  CA_ID?: string;
  Customer_Code?: string;
  Customer_Name?: string;
  frmDate?: string;
  message?: string;
  PaymentDate?: string;
  Status?: string;
  toDate?: string;
}

export interface BookingSummaryResponseModel {
  Received?: string;
  AutoReject?: string;
  Pending?: string;
  Approved?: string;
  Rejected?: string;
  Confirmed?: string;
  UniqueCustomer?: string;
  Status?: string;
  message?: any;
  BookStatus?: string;
  Customer_Code: string;
  CustomerName: string;
  TruckNo: string;
  Quantity: string;
  Loc_ID: string;
  ca_id: string;
  CaName: string;
}


export interface BookingSummaryDetailsResponse {
  BookOrdLst?: BookOrdLst[],
  Status?: string
}

export interface BookOrdLst {
  Received?: any,
  AutoReject?: any,
  Pending?: any,
  Approved?: any,
  Rejected?: any,
  Confirmed?: any,
  UniqueCustomer?: any,
  Status?: any,
  message?: any,
  BookStatus?: any,
  Customer_Code?: string,
  CustomerName?: string,
  TruckNo?: string,
  Quantity?: string,
  Loc_ID?: string,
  ca_id?: string,   
  CaName?: string
}
