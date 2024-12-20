import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configs } from './../../environments/configs';
import { VisitReportResponseModel } from './Interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http:HttpClient) { }

  GetCustomerDetails(customerCode){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('CustomerCode', customerCode);    
    return this.http.get<VisitReportResponseModel>(configs.apiBase+'GetVisitByCustomerCode?'+urlSearchParams)
  }
  
  GetCustomerDetailsAgain(customerCode){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('CustomerCode', customerCode);    
    return this.http.get<VisitReportResponseModel>(configs.apiBase+'GetExistCustomerDetailsByCustomerCode?'+urlSearchParams)
  }  
}
