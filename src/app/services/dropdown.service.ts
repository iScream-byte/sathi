import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configs } from './../../environments/configs';
import { CAListResponseModel, ComplaintsCustomerList, SourceResponseModel, VisitReportDistrictResponseModel, ProductResponseModel, ProductPriceResponseModel } from './Interfaces';
import { encryptDES_ECB_PKCS5 } from '../utils/myencrypt';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
}); 
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
    const body = {
      caId:caId
    }
    const encrypted = encryptDES_ECB_PKCS5(JSON.stringify(body))
    return this.http.post<[VisitReportDistrictResponseModel]>(configs.apiBase+'GetDistrictByCAID',`"${encrypted}"`,{ headers: headers })
  }

  GetCAList(){
    return this.http.post<[CAListResponseModel]>(configs.apiBase+'GetCAList',{})
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
