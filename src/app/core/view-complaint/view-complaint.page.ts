import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';
import { ToastService } from 'src/app/services/toast.service';
import { Network } from '@capacitor/network';
import { DropdownService } from 'src/app/services/dropdown.service';
import { ComplaintSearchList, ViewComplaintListSearchData, ViewComplaintsSearchModel } from 'src/app/services/Interfaces';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.page.html',
  styleUrls: ['./view-complaint.page.scss'],
})
export class ViewComplaintPage implements OnInit {
  currentDate: string;
  hasNetwork:boolean
  source: string = '';
  status: string = '';
  isStartDateModalOpen = false;
  isEndDateModalOpen = false;
  selectedStartDateTime: string;
  selectedEndDateTime: string;
  startDateInDTFormat:any
  customerName: string;
  customerCode: string;
  noData: boolean = null;

  userDetails: any = {};
  roleType:string=''
  boolHasCAResponseYes: boolean = false;
  boolHasCAResponseNo: boolean = true;
  caListResponse:any=[];
  ca:any
  selectedCaId:string=''

  complaintsSearchModel: ViewComplaintsSearchModel = {
    CaId: '',
    Customer_Code: '',
    Status: '',
    fromDate: '',
    toDate: ''
  }

  complaintsSearchList?: ViewComplaintListSearchData[];

  PageNumber = 1;
  PageSize = 10;
  loading = false;
  hasMoreRecords = true; 

  constructor(
    private router: Router,
    private platform: Platform,
    private location: Location,
    private menuController: MenuController,
    private modalController: ModalController,
    private storage: LocalStorageService,
    private loader: MyLoader,
    private toast:ToastService,
    private coreServices: CoreService,
    private dropdownService:DropdownService
  ) {}

  async ngOnInit() {
    this.currentDate = new Date().toISOString().split('T')[0];
    this.startDateInDTFormat = this.currentDate
    const status = await Network.getStatus();
    if (status.connected) {
      this.hasNetwork = true;
    } else {
      this.hasNetwork = false;
    }
    this.storage.getItem('NSUDloginDetail').then((u) => {
      if (u) {
        this.userDetails = JSON.parse(u);
        this.roleType=this.userDetails.roletype
        if (this.roleType == 'TSL'){
          this.getCAList()
        }else{
          this.selectedCaId=this.userDetails.ca_id
        }
      }
    });
  }

  toggleMenu() {
    this.menuController.toggle();
    this.PageNumber=1
  }

  goBack() {
    this.router.navigate(['landing-page']);
  }

  changeSource(){
    this.complaintsSearchList=[]
  }

  openDatetimeModal(modalName: string) {
    modalName == 'startDate'
      ? (this.isStartDateModalOpen = true)
      : (this.isEndDateModalOpen = true);
  }

  onDateTimeChange(event: any, modalName: string) {
    const formattedDate = moment(event.detail.value).format('DD MMM YYYY');
  
    if (modalName === 'startDate') {
      this.selectedStartDateTime = formattedDate;
      this.complaintsSearchModel.fromDate = formattedDate;
      this.startDateInDTFormat=new Date(formattedDate).toISOString().split('T')[0];      
      this.complaintsSearchModel.toDate = '';
      this.selectedEndDateTime=''
    } else {
      this.selectedEndDateTime = formattedDate;
      this.complaintsSearchModel.toDate = formattedDate;
    }
  }

  
  closeDatetimeModal() {
    this.isStartDateModalOpen = false;
    this.isEndDateModalOpen = false;
  }

  async openCustomerSelectModal() {
    if(!this.selectedCaId){
      this.toast.presentToast('Please select a CA','error')
      return
    }
    let data = {
      CA_ID: this.selectedCaId,
      modalName: 'customer',
    };    
    const modal = await this.modalController.create({
      component: SearchableDropdownComponent,
      componentProps: {
        modalData: data,
      },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    this.customerName = result?.data?.CustomerName;
    this.customerCode = result?.data?.Customer_Code;
    this.complaintsSearchModel.Customer_Code = result?.data?.Customer_Code
  }

  resetFilter() {
    this.customerCode = '';
    this.customerName = '';
    this.ca = ''
    this.complaintsSearchModel.CaId=''
    this.complaintsSearchModel.Customer_Code=''
    this.selectedStartDateTime = '';
    this.selectedEndDateTime = '';
    this.noData = null;
    this.source = '';
    this.status = '';
    this.complaintsSearchList=[]
    this.PageNumber=1
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
      this.selectedCaId = '';
    } else {
      this.selectedCaId = ca.CA_ID; 
      this.complaintsSearchModel.CaId=ca.CA_ID     
    }
    this.customerName = '';    
  }

  changeStatus(e:any){    
    this.complaintsSearchModel.Status = e.target.value;
    if (e.target.value != "All" && this.source == 'sahaj') {
      this.complaintsSearchList = null;
    } else if (e.target.value != "Open" && this.source == 'helpdesk') {
      this.complaintsSearchList = null;
    }
  }

  search() {
    this.PageNumber=1
    this.complaintsSearchList=[]
    if(!this.source){
      this.toast.presentToast('Please select source','error')
      return
    }
    this.getComplaintsListUsingInfiniteLoading(1)

  }


  getComplaintsListUsingInfiniteLoading(pagenum:number){
    this.loader.showLoader('Searching...')
    const caID = this.complaintsSearchModel.CaId
    const custCode = this.complaintsSearchModel.Customer_Code?this.complaintsSearchModel.Customer_Code:''
    const status = this.complaintsSearchModel.Status
    const fromDate = this.complaintsSearchModel.fromDate
    const toDate = this.complaintsSearchModel.toDate
    const pageNumber = pagenum
    const pageSize = this.PageSize

    const queries = 
    `CaId=${caID}&Customer_Code=${custCode}&Status=${status}&fromDate=${fromDate}&toDate=${toDate}&PageNumber=${pageNumber}&PageSize=${pageSize}`

    console.log(queries);
    

    if(this.source=='sahaj'){
      this.coreServices.GetComplaintList('sahaj',queries).subscribe((res: ComplaintSearchList)=>{
        if(res.Status == "Success" && res.comps.length > 0){
          this.complaintsSearchList = this.complaintsSearchList.concat(res.comps);
          this.loader.stopLoader()
        }else{
          this.toast.presentToast('No Data Found','error')
          this.loader.stopLoader()
        }        
      })
    }else{
      this.coreServices.GetComplaintList('helpdesk',queries).subscribe((res: ComplaintSearchList)=>{
        if(res.Status == "Success" && res.comps.length > 0){
          console.log(res);
      
          this.complaintsSearchList = res.comps
          this.loader.stopLoader()
        }else{
          this.toast.presentToast('No Data Found','error')
          this.loader.stopLoader()
        }        
      })

    }
    

  }



   loadData(event: any) {
    if (this.loading || !this.hasMoreRecords) {
      event.target.complete();  
      return;
    }

    this.loading = true;

    const caID = this.complaintsSearchModel.CaId
    const custCode = this.complaintsSearchModel.Customer_Code?this.complaintsSearchModel.Customer_Code:''
    const status = this.complaintsSearchModel.Status
    const fromDate = this.complaintsSearchModel.fromDate
    const toDate = this.complaintsSearchModel.toDate
    const pageNumber = this.PageNumber
    const pageSize = this.PageSize

    const queries = 
    `CaId=${caID}
    &Customer_Code=${custCode}
    &Status=${status}
    &fromDate=${fromDate}
    &toDate=${toDate}
    &PageNumber=${pageNumber}
    &PageSize=${pageSize}
    `

    console.log(queries);
    
    if(this.source=='sahaj'){
      this.coreServices.GetComplaintList('sahaj',queries).subscribe((res: ComplaintSearchList)=>{
        if(res.Status == "Success"){
          if(res.comps.length==0){
            this.hasMoreRecords = false;
          }else{
            this.complaintsSearchList = this.complaintsSearchList.concat(res.comps);
            this.PageNumber++
          }
        }else{
        }
        
        event.target.complete();
        this.loading = false;

      })
    }else{

      this.coreServices.GetComplaintList('helpdesk',queries).subscribe((res: ComplaintSearchList)=>{
        if(res.Status == "Success"){     
          if(res.Status == "Success"){
            if(res.comps.length==0){
              this.hasMoreRecords = false;
            }else{
              this.complaintsSearchList = this.complaintsSearchList.concat(res.comps);
              this.PageNumber++
            }
        }else{
        }
        
        event.target.complete();
        this.loading = false;
      }}
      )

    }    
    
  }



}
