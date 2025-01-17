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
  BookOrdLst?: BookOrdLst[];
  Status?: string;
}

export interface BookOrdLst {
  Received?: any;
  AutoReject?: any;
  Pending?: any;
  Approved?: any;
  Rejected?: any;
  Confirmed?: any;
  UniqueCustomer?: any;
  Status?: any;
  message?: any;
  BookStatus?: any;
  Customer_Code?: string;
  CustomerName?: string;
  TruckNo?: string;
  Quantity?: string;
  Loc_ID?: string;
  ca_id?: string;
  CaName?: string;
}

export interface SourceResponseModel {
  SourceLst?: [SourceListArrayModel];
  Status?: string;
}

export interface SourceListArrayModel {
  Customer_Code?: string;
  SourceID?: string;
  SourceName?: string;
}

export interface ProductResponseModel {
  ProdList?: [ProductListArrayModel];
  Status?: string;
}
export interface ProductListArrayModel {
  SourceID?: string;
  Loc_ID?: string;
  ProductID?: string;
  ProductName?: string;
}
export interface ProductPriceResponseModel {
  ProdPriceLst?: [ProductPriceArrayModel];
  Status?: string;
}

export interface ProductPriceArrayModel {
  SourceID?: string;
  Loc_ID?: string;
  ProductID?: string;
  Customer_Code?: string;
  Rate?: string;
  DO_Y_N?: string;
  GST_Y_N?: string;
  GST?: string;
  CESS?: string;
  TotalAmount?: string;
  TaxPercent?: string;
  ED?: string;
  Surcharge?: string;
}

export interface CustDashResposneModel {
  CustDashList?: [CustDashArrayModel];
  Status?: string;
  CustName?: string;
  TIN_NO?: string;
  GST_NO?: string;
  CustAdd?: string;
}
export interface CustDashArrayModel {
  SourceID?: string;
  Loc_ID?: string;
  ProductID?: string;
  Customer_Code?: string;
  DocValid?: string;
  DoNumber?: string;
  Balance?: string;
  Quantity?: string;
  Rate?: string;
  ReconciledDate?: string;
  permitLimit?: string;
  Licensestring?: string;
  LicenseValidity?: string;
  LimitApplicable?: string;
  LicenseApplicable?: string;
  LicenseNo?: string;
}

export interface CustomerRegSearchModel {
  userId?: string;
  CaId?: string;
  DistrictID?: string;
  fromDate?: any;
  toDate?: any;
}

export interface CustomerRegSearchResponse {
  visitLst?: CustomerRegListArray[];
  status?: string;
}

export interface CustomerRegListArray {
  Visit_ID?: string;
  sysuser_id?: string;
  sysuser_pwd?: string;
  CA_ID?: string;
  CategoryID?: string;
  CategoryName?: string;
  AgencyName?: string;
  Agent_ID?: string;
  AgentName?: string;
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
  Firing_Month?: string;
  Closing_Month?: string;
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
  fromDate?: string;
  toDate?: string;
  FileNamePAN?: string;
  FilePANPath?: string;
  filebytePAN?: string;
  FileNameADHAR?: string;
  FileADHARPath?: string;
  filebyteADHAR?: string;
  FileNameTRLICENSE?: string;
  FileTRLICENSEPath?: string;
  filebyteTRLICENSE?: string;
}

export interface NewRegisteredCustomerForTodaySearch {
  caId?: string;
  DistrictId?: string;
}

export interface NewRegisteredCustomerForTodayResponseModel {
  visitLst?: NewRegisteredCustomerForTodayResponseArray[];
  status?: string;
}
export interface NewRegisteredCustomerForTodayResponseArray {
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
}

export interface Update27cFormModel {
  User_ID?: string;
  Customer_Code?: string;
  validForm?: string;
  Active_Status?: string;
}

export interface Update27cFormResponseModel {
  User_ID: string;
  Customer_Code: string;
  valid_from: string;
  Active_Status: string;
  status: string;
  message: string;
}

export interface TracknoChangeRejectResponseModel {
  status?: string;
  message?: string;
}

export interface TracknoChangeRejectModel {
  Id?: string;
}
export interface TracknoChangeApproveResponseModel {
  status?: string;
  message?: string;
}

export interface TracknoChangeApproveModel {
  Id?: string;
}
export interface TruckChangeListModel {
  Status?: string;
  Msg?: string;
  StatusCode?: string;
  TruckChange_List?: TruckChange_List[];
}
export interface TruckChange_List {
  TrailID?: string;
  BookingID?: string;
  receivedOn?: string;
  ExistingTruckno?: string;
  ChangedTrukno?: string;
  company_name?: string;
  UserID?: string;
  approveReject_status_CA?: string;
  approveReject_status_TSL?: string;
  RequestedBy?: string;
  ReqestedOn?: string;
  CA_ApproveReject_By?: string;
  CA_ApproveRejectOn?: string;
  TSL_ApproveRejectBy?: string;
  TSL_ApproveRejectOn?: string;
  NoOfChange?: string;
  StatusCode?: string;
  Msg?: string;
  Role?: string;
  CustID?: string;
  ProdId?: string;
}
export interface TruckApproveRejectModel {
  TrailID?: string;
  BookingID?: string;
  receivedOn?: string;
  ExistingTruckno?: string;
  ChangedTrukno?: string;
  company_name?: string;
  UserID?: string;
  approveReject_status_CA?: string;
  approveReject_status_TSL?: string;
  RequestedBy?: string;
  ReqestedOn?: string;
  CA_ApproveReject_By?: string;
  CA_ApproveRejectOn?: string;
  TSL_ApproveRejectBy?: string;
  TSL_ApproveRejectOn?: string;
  NoOfChange?: string;
  StatusCode?: string;
  Msg?: string;
  Role?: string;
  CustID?: string;
  ProdId?: string;
}

export interface TopUpSendData {
  caid?: string;
  CustomerCode?: string;
  productid?: string;
}

export interface FeedbackSendData {
  Key?: string;
  fromDate?: string;
  toDate?: string;
}

export interface TopupResponseModel {
  Status?: string;
  permitList?: PermitListArray[];
}

export interface ViewApprovalPermitListModel {
  Status?: string;
  permitList?: PermitListArray[];
}

export interface ApproveRejectModel {
  TopUp_ID?: string;
  Limit_ID?: string;
  Customer_Code?: string;
  PermitTopUpApplied?: string;
  TopUpStatus?: string;
  CreatedBy?: string;
  Remarks?: string;
  CustomerName?: string;
  CAName?: string;
}
export interface ApproveRejectSendData {
  TopUp_ID?: string;
  Limit_ID?: string;
  Customer_Code?: string;
  PermitTopUpApplied?: string;
  TopUpStatus?: string;
  CreatedBy?: string;
  Remarks?: string;
  CustomerName?: string;
  CAName?: string;
}

export interface ApproveRejectResponseModel {
  status?: string;
  message?: string;
}

export interface PermitListArray {
  AgentName?: string;
  Agent_ID?: string;
  BalanceAmount?: string;
  BalanceQuantity?: string;
  CAName?: string;
  CA_ID?: string;
  CustomerName?: string;
  Customer_Code?: string;
  LastDateOfPermitTopUp?: string;
  Limit_ID?: string;
  message?: string;
  PermitDate?: string;
  PermitQuantity?: string;
  PermitTopUpApplied?: string;
  Permit_Status?: string;
  ProductId?: string;
  productName?: string;
  TopUPQty?: string;
}

export interface TopupQuantityToSend {
  AgentId?: string;
  caid?: string;
  CustomerCode?: string;
  CustomerName?: string;
  PermitTopUpApplied?: string;
  productid?: string;
  // LimitID?: string,
  // topUPQty?: string
}

export interface TopupQuantityResponse {
  Customer_Code?: string;
  CA_ID?: string;
  CustomerName?: string;
  ProductId?: string;
  productName?: string;
  BalanceQuantity?: string;
  BalanceAmount?: string;
  Limit_ID?: string;
  PermitQuantity?: string;
  PermitDate?: string;
  Permit_Status?: string;
  TopUPQty?: string;
  message?: string;
  PermitTopUpApplied?: string;
  AgentName?: string;
  CAName?: string;
  LastDateOfPermitTopUp?: string;
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
}

export interface FeedbackResponseModel {
  status?: string,
  message?: string,
}