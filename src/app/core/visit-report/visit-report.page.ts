import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, MenuController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { VisitReportSaveModel } from 'src/app/services/Interfaces';
import { DropdownService } from './../../services/dropdown.service';
import * as moment from 'moment';
import { Network } from '@capacitor/network';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastService } from './../../services/toast.service';
import { MyLoader } from './../../shared/MyLoader';
@Component({
  selector: 'app-visit-report',
  templateUrl: './visit-report.page.html',
  styleUrls: ['./visit-report.page.scss'],
})
export class VisitReportPage implements OnInit {
  constructor(
    private menuController: MenuController,
    private router: Router,
    private platform: Platform,
    private location: Location,
    private dropdownServices : DropdownService,
    public actionSheetController: ActionSheetController,
    public toast:ToastService,
    public loader:MyLoader
  ) {}


  data: VisitReportSaveModel = {
    Visit_ID: '',
    sysuser_id: '',
    sysuser_pwd: '',
    CA_ID: '',
    AgencyName: '',
    Agent_ID: '',
    AgentName: '',
    ORG_ID: '',
    District_ID: '',
    DistrictName: '',
    Visit_Date: '',
    Visit_Customer_Name: '',
    VisitType: '',
    VisitMode: '',
    VisitTypeOthers: '',
    Customer_Code: '',
    Location: '',
    Product_Manufactured: '',
    Current_Firing_Plan_monthly_avg: '',
    Last_Year_Firing_Plan_monthly_avg: '',
    LastYearFiringPlanCloseMonthAndYear: '',
    LastYearFiringPlanStartMonthAndYear: '',
    CurrentYearFiringPlanCloseMonthAndYear: '',
    CurrentYearFiringPlanStartMonthAndYear: '',
    BlockName: '',
    OwnerName: '',
    DocType: '',
    OtherName: '',
    OtherName1: '',
    Ownerphonenumber: '',
    Alternatephonenumber: '',
    Registerednumber: '',
    IndustryType: '',
    noOfRoundsInSeason: '',
    CategoryID: '',
    CategoryName: '',
    Last_Year_Firing_Month: '',
    BrickKiln: '',
    Paya: '',
    CHAMBER: '',
    PayaChamber: '',
    NoOfBircksPerRound: '',
    CoalRequirementInSeason: '',
    CoalRequirementPerRoundMT: '',
    RequirementOfCoalinBalanceDaysOfSessionMT: '',
    QuantityManufacturedAnnual: '',
    QuantityRequiredAnnual: '',
    QuantityRequiredInBalanceDays: '',
    InventoryOfCoal: '',
    Requirements: '',
    Ghato_Usage: '',
    Competition: '',
    LandedPriceCompetitionCoal: '',
    Avg_price_perThousand_bricks: '',

    Number_of_kilns_in_Visinity: '',
    Inventory_Prepared_Bricks: '',
    Inventory_Raw_Bricks: '',
    Remarks: '',
    LAT: '',
    LONG: '',
    CreatedDate: '',
    CreatedBY: '',
    UpdateDate: '',
    UpdatedBY: '',
    status: '',
    message: '',
    fromDate: '',
    toDate: '',

    FileNamePAN: 'NoImage',
    FilePANPath: 'NoImage',
    filebytePAN: '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',

    FileNameADHAR: 'NoImage',
    FileADHARPath: 'NoImage',
    filebyteADHAR: 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABPCAYAAAAdiWChAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAH40lEQVR4Ae2biU6FOBiFUa/7vhuX938h38DEmLjGfXfm6+Q4lVCB0lK48icIt3vP6b+04MTx8fHX4+NjNjU1lX19fWWDpEHg4+MjW19fzybTdD/06kJgIMSFTKL0gZBEwLu6HQhxIZMofSAkEfCubgdCXMgkSh8ISQS8q9uRK6Mr6RMTE4VDGdc9U2cJgQhAZ8NUBP7k5GTGVZRXyGBPEjtLyPv7uwF8fn4+m52dzaanpw2kn5+f2evra/b8/GzukOLSop5w8GOYnSOEFc+1urpqLsgAdFvIR3MeHh6y6+vr7OXlxRz92GX6+twpQgAa8Hd3d7OlpSVDDGloRV4oB2mUu7i4yG5ubsaClM4QIjIODg4yzBQmC/nNHKElIpD71dVV70n5aQvyy7Dl33t7e99kQMRvZIgstIdre3s7W15eNqas5WEH7S45IYDOSl9ZWckWFxeNZpQRYSNAWbSLa2trKxuNRubZLtOn5+SEACTvYtbW1ryBhBS0ZGZmxhDLcx1Su0RYUkIADe3AZwAm5PgCST3q4+TxJzz3UZISAmAANzc3Z4gIASL7Fa6+aklyQljZ2vQ1XdEQinb0+XV0UkKkETJTujclJlQ7TcfhUz8pIQIO8xJKILmv5goMkhLCAACQs6kQAsGQwaaSZ2lgiLbbaiMpIQCGzX96ejJANpk0bUEC51pvb2/e0VqTMYSom5QQJgAhnNxCStNwFVJub28NLjKHIUBqs43khGiynENplSut6p16RFZ88Hd/fz9EWVWBc5VDMwBTh4MAXFVEBn7j/Py8arXOluvMaS8r/PLy0pgtPqkEaEVfReZHpFEPMk5PT01w0Oc9CKukM4QwGDSFVU7Utbm5+eOgUARQDoLkb3hJpTp9J4O5dYoQBgTQvGzChOkEmBNc0iVoBNHU3d2duUgfBzKYR+cIMYP6lwD5BF7RcrQC4GgGZoywlnz5D+rYGsTvvkonCQFcwIcIntEGAU66TBZ3pVclgDoQiknkhPns7MyQXbV+7HKdJESTFthoR17IU34+z/UbMjju53R5Y2PDEMG+hT1QV0ze/4bZNYsOpAt8++4zLOpDys7OzjcBvGX00TSf/qvU6QUhVSZSVkbagalaWFgwmoI/4uUYYTY+iTKp5U8QAtAAzttEwIcI0rjQGl4fY8YwZ6lJ+ROEQAChM1+mIJAgUR6ag9h5KtPm/U8QAsj4DaIqaYdARiNIQ3v0GVFKLRlrQgAWM8QXjoCdJ0OkSCuIvNAkyqWSJIQAgECIOXGFuERSv/UpLeE7YtvHxBybq+3WCQEYjkGI+10r1jXYuukArRC3rC+RgoMn8krl4FslRCaESR8dHZnIJka4qX5w1HXA1WJBo5A2tDi/yFojRCARXmLTORbhw2qeISWU0E9RiFulfeqiSexTGFcKLWmNENlwVi2OU5PlA2vMCkBQBlCaCO1AdlGIW6VdjRMHr6isSr1QZVohRNpBpEN4KXvO5HnGkaIt+JWmJow2IUNg1iVYWgKpkML42pRWCGFSgM0EmTCgIQILbeHL98PDQ2MufEihLdrBPzXdT4gU3sdoAbVFSnRCNLnfjicEpvwKZev6FcjAP2ESpYFNQGTRMC7a496WRCcEcKrE9yKOifMvbXX8isBTiCsNbAKiFgkkt3n4GJUQgYypqvK+gfKACYlV/Yr6IFStE+JWIUttM5a2Dh+jEcJkMDvY89+OLfLAUA8p8itFZdUHZi6Eqcr3wQJhMbW1N4lGCODIkTPJumYEYiDF9iv8RkQafTQJcU1jJX/oi34IOpoGCyVdmewohGgScuS+K1ftMFL8ChfEQgx5POM3IMW3jyogaTFpD0VfsSQKIQCGI4cQTcZ3AgCPAALtsV+BAD58wLYTloog3z7K6mlhMKfYe5MohEACA9dRtkAtm3hZPsBzrLG/v2/CUQiJqRn2eJgD/XOkwhhiaUlQQjRovewJDZbaZxeO+bI/nrPBi/XMQqNPTFcsCUpIfsBNzVXRpCGFdmOt0KI+laYFgYZgPn1OFNSW6x6MEAbLABWzh9YO1wTaTteCYJ74lND+KwghWjlsnuTISRtXYbERWGC60NaQliAIIRqU7cjHlQzmxWKDFPYlivJCzTcIIQwuliMPNdHQ7bAIIQYtqXIsVLX/IIQwMLSDe0j1rTqJFOWYK/5Dh4+hfGYjQjQo/Ebog70UINftk/lDBPMPdfjYiBAGw56AiEMqXHdSfS/PvDFZ2ps0tRDehGh1MBDtyPsOrs/4hQOHj7xhbBoGexHCINhz/DVH7iJMWoEf1UGnq2xZuhchmCqOEBgAogGVdTau+dISmW/w8RVvQuTI6ZwBDfLfibQOHzFdPlL7X9rQBiIKaQeaAiHSEj2LJNLzz/m0/MBVXulF5fNlVDZ/t8eVz9Nvta+ypOfbVxny8s+kgQPp3HlHc3JyQnJtqU0IPTBY/snfnkDtnse4AvgQefkcPtYmhM54OcQ/Sg7iRkCWw12iOKc2ITQDKYS6g7gR8LUe3qj6duiewpADAl5R1gBdPAQGQuJh69XyQIgXbPEqfRMy+IR4INdp+dupEzlBin23G1IeafazythpPCNFbdnlVJe7XSefbreTr5//bde12+WZdiSqpzvpetZdadztuvyWqGz+Tj5pSFHdfHnKcI04+vDd5pvehj9BEIADuBhxDIKwkRkkHQKQweHkPyMtmX05hquTAAAAAElFTkSuQmCC',

    FileNameTRLICENSE: 'NoImage',
    FileTRLICENSEPath: 'NoImage',
    filebyteTRLICENSE: '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',

    FileNameCTO: 'NoImage',
    FileCTOPath: 'NoImage',
    filebyteCTO: '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',

    FileNameJIMMS: 'NoImage',
    FileJIMMSPath: 'NoImage',
    filebyteJIMMS: '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',

    FileNameOthers: 'NoImage',
    FileOthersPath: 'NoImage',
    filebyteOthers: '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',

    FileNameOthers1: 'NoImage',
    FileOthersPath1: 'NoImage',
    filebyteOthers1: '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'


  }

  isConversionDatetimeModalOpen = false;
  isFiringStartDateOpen = false;
  isFiringCloseDateOpen = false;
  isLastFiringStartDateOpen = false;
  isLastFiringStartDateClose = false;
  hasNetwork=false
  industryTypes:any=[]
  existingCustomerUploadArr: any = [];


  visitType:string=''
  visitMode:string='Online';
  othersShown: boolean = false;
  customerTypeValue:any = "";
  districtName:any = "";
  brickKiln:string=''

  completed3: boolean = false;
  completed4: boolean = false;

  selectedCustomerType:string='new'
  brickOrOther:string=''
  imageUrl: string;
  defaultImageUrl: string = "/assets/images/placeholderImage.png";

  selectedImageExistingUser: string;
  selectedImageExistingUser1: string;
  uploadType: any = '';
  isCameraForNewCustomer: boolean;
  isCameraForPan: boolean;
  isCameraForAdhar: boolean;
  isCameraForTrlicense: boolean;
  isCameraForCTO: boolean;
  isCameraForJIMMS: boolean;


  selectedImagePan: string;
  idPan = "";
  selectedImageAadhaar: string;
  idAadhaar = "";
  selectedImageTrade: string;
  idTrade = "";
  selectedImageCTO: string;
  idCTO = "";
  selectedImageJIMMS: string;
  idJIMMS = "";



  panna: boolean = false;
  pancl: boolean = false;
  aadharna: boolean = false;
  aadharcl: boolean = false;
  GSTna: boolean = false;
  GSTcl: boolean = false;
  CTOna: boolean = false;
  CTOcl: boolean = false;
  JIMMSna: boolean = false;
  JIMMScl: boolean = false;
  geotag: boolean = false;

  ngOnInit() {
    this.dropdownServices.GetIndustryList().subscribe(res=>{
      this.industryTypes=res      
    })
  }

  async ionViewDidEnter() {
    const status = await Network.getStatus();
    if(status.connected){
      this.hasNetwork = true;
    }
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }



  openDatetimeModal(name) {
    if(name=='conversion'){
      this.isConversionDatetimeModalOpen = true;
    }else if(name=='firingStart'){
      this.isFiringStartDateOpen = true
    }else if(name=='firingClose'){
      this.isFiringCloseDateOpen = true
    }else if(name=='lastFiringStart'){
      this.isLastFiringStartDateOpen = true
    }else if(name=='lastFiringClose'){
      this.isLastFiringStartDateClose = true
    }
  }


  closeDatetimeModal() {
    this.isConversionDatetimeModalOpen = false;
    this.isFiringStartDateOpen = false
    this.isFiringCloseDateOpen = false
    this.isLastFiringStartDateOpen=false
    this.isLastFiringStartDateClose=false
  }

  toggleMenu() {
    this.menuController.toggle();
  }
  goBack() {
    this.location.back();
  }







  getVisitType(event) {
    if (event.target.value == "self") {
      this.othersShown = false;
    } else {
      this.othersShown = true;
    }
    this.data.VisitType = event.target.value;
    this.visitType=event.target.value
  }

  getVisitMode(event) {
    this.visitMode=event.target.value    
  }

  checkBoxClick(event){
    
    
  }

  getCustomerType(event) {
    if (event.target.value == "Retail") {
      this.customerTypeValue = "2";
      this.data.CategoryID = "2";
    } else if (event.target.value == "Institutional") {
      this.customerTypeValue = "1";
      this.data.CategoryID = "1";
    }
    this.data.CategoryID = this.customerTypeValue;
  }


  selectBrickOrOther(event){
    if(event.target.value=='brick'){
      if (this.completed3 == false) {      
        this.completed3 = true;
        this.completed4 = false;
        this.data.Product_Manufactured = "Brick"
        // console.log("---->>>>" + this.data.Product_Manufactured)
      }
    }else{
      if (this.completed3 == false) {      
        this.completed3 = false;
        this.completed4 = true;
        this.data.Product_Manufactured = "Other"
        // console.log("---->>>>" + this.data.Product_Manufactured)
      }
    }
    
  }


  getBrickKiln(event) {    
    if (event.target.value == "FCBT") {
      this.brickKiln = "FCBT";
      this.data.PayaChamber='';
      this.data.CHAMBER='';
    } else if (event.target.value == "ZigZag") {
      this.brickKiln = "ZigZag";
      this.data.PayaChamber='';
      this.data.Paya='';
    } else {
      this.brickKiln = "HawaBhatta";
      this.data.Paya='';
      this.data.CHAMBER='';
    }
    this.data.BrickKiln = this.brickKiln;
  }

  expectedDateChanged(gotDate) {
    const date2 = moment(gotDate.target.value).format("MMMM YYYY");
    this.data.ExpectedDateForConversion = date2;
  }

  currentfiringMonthDateChanged(gotDate) {
    const date2 = moment(gotDate.target.value).format("MMMM YYYY");
    this.data.CurrentYearFiringPlanStartMonthAndYear = date2;
  }

  currentclosingMonthDateChanged(gotDate) {
    const date2 = moment(gotDate.target.value).format("MMMM YYYY");
    this.data.CurrentYearFiringPlanCloseMonthAndYear = date2;
  }

  lastfiringMonthDateChanged(gotDate) {
    const date2 = moment(gotDate.target.value).format("MMMM YYYY");
    this.data.LastYearFiringPlanStartMonthAndYear = date2;
  }

  lastclosingMonthDateChanged(gotDate) {
    const date2 = moment(gotDate.target.value).format("MMMM YYYY");
    this.data.LastYearFiringPlanCloseMonthAndYear = date2;
  }


  async takePhoto(source,docType) {
    // this.loader.showLoader()
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: source=='camera'? CameraSource.Camera:CameraSource.Photos, 
        quality: 100, 
      });
      

      if (docType == 'others') {
        if (this.existingCustomerUploadArr.length < 1) {
          this.selectedImageExistingUser = "data:image/jpeg;base64," + photo.base64String;
          this.existingCustomerUploadArr.push({ type: this.uploadType, pic: this.selectedImageExistingUser, chk: '', name: this.data.DocType });
          this.saveBase64ExistingData(photo.base64String);
        } else {
          this.selectedImageExistingUser1 = "data:image/jpeg;base64," + photo.base64String;
          this.existingCustomerUploadArr.push({ type: this.uploadType, pic: this.selectedImageExistingUser1, chk: '', name: this.data.DocType });
          this.saveBase64ExistingData1(photo.base64String);
        }
      }else if (docType == 'pan') {
        console.log("Taking Pan Photo", docType);
        this.selectedImagePan = "data:image/jpeg;base64," + photo.base64String;
        this.saveBase64DataPan(photo.base64String);
      }else if (docType == 'adhar') {
        this.selectedImageAadhaar = "data:image/jpeg;base64," + photo.base64String;
        this.saveBase64DataAadhaar(photo.base64String);
      }else if (docType == 'gst') {
        this.selectedImageTrade = "data:image/jpeg;base64," + photo.base64String;
        this.saveBase64DataTrade(photo.base64String);
      }else if (docType == 'cto') {
        this.selectedImageCTO = "data:image/jpeg;base64," + photo.base64String;
        this.saveBase64DataCTO(photo.base64String);
      } else if (docType == 'jimms') {
        this.selectedImageJIMMS = "data:image/jpeg;base64," + photo.base64String;
        this.saveBase64DataJIMMS(photo.base64String);
      }




      
      
    } catch (error) {
      console.error('Camera error:', error);
    }
  }



  async openCamera(type) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [{
        text: 'Load from Library',        
        icon: 'document',
        handler: () => {
          this.takePhoto('gallery',type)
        }
      }, {
        text: 'Use Camera',
        icon: 'camera',
        handler: () => {
          this.takePhoto('camera',type)
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
      }]
    });
    await actionSheet.present();
  }



  existingCustomerUpload() {
    if (this.data.DocType.trim() == '') {
      this.toast.presentToast('Please enter document name','error')
    } else {      
      this.openCamera('others');
    }
  }


  saveBase64ExistingData(b64: string) {
    if (b64.length != 0) {
      //console.log("image data------>" + JSON.stringify(b64));
      this.isCameraForNewCustomer = true;
      this.data.filebyteOthers = b64;
      this.data.FileNameOthers = "15";
      this.data.OtherName = this.data.DocType;
      this.data.DocType = '';
    }
    this.loader.dismissLoader()
    // console.log("other details------->" + this.data.filebyteOthers);
    // console.log("other name--------->" + this.data.FileNameOthers);
  }

  saveBase64ExistingData1(b64: string) {
    if (b64.length != 0) {
      //console.log("image data------>" + JSON.stringify(b64));
      this.isCameraForNewCustomer = true;
      this.data.filebyteOthers1 = b64;
      this.data.FileNameOthers1 = "16";
      this.data.OtherName1 = this.data.DocType;
      this.data.DocType = '';
    }
    this.loader.dismissLoader()
    // console.log("other details------->" + this.data.filebyteOthers1);
    // console.log("other name--------->" + this.data.FileNameOthers1);
  }

  saveBase64DataPan(b64: string) {
    if (b64.length != 0) {
      this.isCameraForPan = true;
      this.data.filebytePAN = b64;
      this.data.FileNamePAN = "2";
    }
    // this.actLoader.dismissLodaing();
    // console.log("pan details------->" + this.data.filebytePAN)
    // console.log("pan namew--------->" + this.data.FileNamePAN)
  }

  saveBase64DataAadhaar(b64: string) {
    if (b64.length != 0) {
      this.isCameraForAdhar = true;
      this.data.filebyteADHAR = b64;
      this.data.FileNameADHAR = "3";
    }
    // this.actLoader.dismissLodaing();
  }

  saveBase64DataTrade(b64: string) {
    if (b64.length != 0) {
      this.isCameraForTrlicense = true;
      this.data.filebyteTRLICENSE = b64;
      this.data.FileNameTRLICENSE = "9";
    }
    // this.actLoader.dismissLodaing();
  }

  saveBase64DataCTO(b64: string) {
    if (b64.length != 0) {
      this.isCameraForCTO = true;
      this.data.filebyteCTO = b64;
      this.data.FileNameCTO = "11";
    }
    // this.actLoader.dismissLodaing();
  }


  saveBase64DataJIMMS(b64: string) {
    if (b64.length != 0) {
      this.isCameraForJIMMS = true;
      this.data.filebyteJIMMS = b64;
      this.data.FileNameJIMMS = "12";
    }
    // this.actLoader.dismissLodaing();
  }




  CheckboxpannaClicked() {
    this.pancl = false;
    this.panna = true;
  }

  CheckboxpanclClicked() {
    this.pancl = true;
    this.panna = false;
  }

  CheckboxaadharnaClicked() {
    this.aadharcl = false;
    this.aadharna = true;
  }

  CheckboxaadharclClicked() {
    this.aadharcl = true;
    this.aadharna = false;
  }

  CheckboxGSTnaClicked() {
    this.GSTcl = false;
    this.GSTna = true;
  }

  CheckboxGSTclClicked() {
    this.GSTcl = true;
    this.GSTna = false;
  }

  CheckboxCTOnaClicked() {
    this.CTOcl = false;
    this.CTOna = true;
  }

  CheckboxCTOclClicked() {
    this.CTOcl = true;
    this.CTOna = false;
  }

  CheckboxJIMMSnaClicked() {
    this.JIMMScl = false;
    this.JIMMSna = true;
  }

  CheckboxJIMMSclClicked() {
    this.JIMMScl = true;
    this.JIMMSna = false;
  }










  saveNow(){
    if(this.visitMode =='Online' && this.hasNetwork == false) {
      this.toast.presentToast('You are not connected to the network now, Please select offline in visit mode.','error')
    }else{
      
    }
  }




}
