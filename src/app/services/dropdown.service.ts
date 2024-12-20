import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configs } from './../../environments/configs';
import { ComplaintsCustomerList, VisitReportDistrictResponseModel } from './Interfaces';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http:HttpClient) { }

  GetIndustryList(){
    return this.http.get(configs.apiBase+'GetIndustryType')
  }  
  
  GetCustomerList(caId){
    return this.http.get<ComplaintsCustomerList>(configs.apiBase+'GetCustomerByCAId?'+ 'CaId=' + caId)
  }  
  
  GetDistrictList(caId){
    return this.http.get<[VisitReportDistrictResponseModel]>(configs.apiBase+'GetDistrictByCAID?'+ 'CA_Id=' + caId)
  }
}
