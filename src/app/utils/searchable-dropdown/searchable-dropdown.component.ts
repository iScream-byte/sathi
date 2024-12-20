import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comp, DailyVisitReportSearchModel } from 'src/app/services/Interfaces';
import { DropdownService } from './../../services/dropdown.service';
import { MyLoader } from './../../shared/MyLoader';
import { VisitReportDistrictResponseModel } from './../../services/Interfaces';

@Component({
  selector: 'app-searchable-dropdown',
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss'],
})
export class SearchableDropdownComponent implements OnInit {
  @Input() modalData: { CA_ID?: string; visitMode?: string, modalName:string };
  filterCustomerName?: Comp[];
  private customerList?: Comp[];

  filterDistrict: Array<VisitReportDistrictResponseModel>;
  districtModalData?: VisitReportDistrictResponseModel;
  districtList?: [VisitReportDistrictResponseModel];
  dataForSearch: DailyVisitReportSearchModel = {
    userId: '',
    CaId: '',
    fromDate: '',
    toDate: '',
    DistrictID: ''
  };

  roleType: string;
  visitMode: string;
  constructor(
    private modalController: ModalController,
    private dropdownService: DropdownService,
    private loader: MyLoader
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    
    if(this.modalData.modalName=='customer'){
      const caId = this.modalData.CA_ID;

      this.dropdownService.GetCustomerList(caId).subscribe(
        (res) => {
          if (res.Status === 'Success') {
            this.customerList = res.comps;
            this.filterCustomerName = this.customerList;
          } else {
            this.customerList = [];
            this.filterCustomerName = [];
          }
        },
        (error) => {
          console.error('Error fetching customer list', error);
          this.customerList = [];
          this.filterCustomerName = [];
        },
        () => {
          this.loader.dismissLoader();
        }
      );

    }


    if(this.modalData.modalName=='district'){
      this.dropdownService.GetDistrictList(this.modalData.CA_ID).subscribe(res=>{
        if(res){
          if(res.length>0){
            this.districtList = res;
            this.filterDistrict = this.districtList;
          }else{
            this.districtList = [undefined]; 
            this.filterDistrict = [];            
          }
        }else{
          this.districtList = [undefined];
          this.filterDistrict = [];
        }
        
      })

    }


  }

  selectCustomer(customer) {
    this.modalController.dismiss(customer);
  }

  filterItems(ev: any) {
    this.filterCustomerName = this.customerList;

    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.filterCustomerName = this.filterCustomerName.filter(function (item) {
        return (
          item.CustomerName.toLowerCase().includes(val.toLowerCase()) ||
          item.Customer_Code.toLowerCase().includes(val.toLowerCase())
        );
      });
    }
  }


  filterDistrictFunc(ev: any) {
    this.filterDistrict = this.districtList;
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.filterDistrict = this.filterDistrict.filter(function (item) {
        return item.DistrictName.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  didSelect(data: any) {
    this.modalController.dismiss(data);
  }


}
