import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configs } from './../../environments/configs';
import { CAListResponseModel, ComplaintsCustomerList, SourceResponseModel, VisitReportDistrictResponseModel, ProductResponseModel, ProductPriceResponseModel } from './Interfaces';

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

  GetCAList(){
    return this.http.get<[CAListResponseModel]>(configs.apiBase+'GetCAList')
  }

  GetSourceListByCustomerCode(queries:string){
    return this.http.get<SourceResponseModel>(configs.apiBase+'GetSourceByCustomer?'+queries)
  }  
  
  GetProductPriceBySourceId(queries:string){
    return this.http.get<ProductResponseModel>(configs.apiBase+'GetProductByLocSource?'+queries)
  }  
  
  GetFinalProductPrice(queries:string){
    return this.http.get<ProductPriceResponseModel>(configs.apiBase+'GetProductListByLocSourceProdCust?'+queries)
  }
}
