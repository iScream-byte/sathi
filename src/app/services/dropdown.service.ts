import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configs } from './../../environments/configs';
import { CAListResponseModel, ComplaintsCustomerList, SourceResponseModel, VisitReportDistrictResponseModel, ProductResponseModel, ProductPriceResponseModel } from './Interfaces';
import { decryptDES_ECB_PKCS5, encryptDES_ECB_PKCS5, getCurrentDateTime } from '../utils/myencrypt';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
}); 
@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http:HttpClient) { }

  GetIndustryList(){
    const body={
       DateTime:getCurrentDateTime()
    }
    const encrypted = encryptDES_ECB_PKCS5(JSON.stringify(body))
    return this.http.post(configs.apiBase+'GetIndustryType',`"${encrypted}"`,{ headers: headers })
  }  
  
  GetCustomerList(caId){
    const body = {
      Ca_Id:caId,
      DateTime:getCurrentDateTime()
    }
    const encrypted = encryptDES_ECB_PKCS5(JSON.stringify(body))   
    return this.http.post<ComplaintsCustomerList>(configs.apiBase+'GetCustomerByCAId',`"${encrypted}"`,{ headers: headers })
  }  
  
  GetDistrictList(caId){
    const body = {
      ca_Id:caId,
      DateTime:getCurrentDateTime()
    }
    const encrypted = encryptDES_ECB_PKCS5(JSON.stringify(body))    
    return this.http.post<[VisitReportDistrictResponseModel]>(configs.apiBase+'GetDistrictByCAID',`"${encrypted}"`,{ headers: headers })
  }

  GetCAList(){
    const body = {
      DateTime:getCurrentDateTime()
    }
    const encrypted = encryptDES_ECB_PKCS5(JSON.stringify(body))   
    return this.http.post<[CAListResponseModel]>(configs.apiBase+'GetCAList',`"${encrypted}"`,{ headers: headers })
  }

  GetSourceListByCustomerCode(queries:any){
    const encrypted = encryptDES_ECB_PKCS5(JSON.stringify(queries)) 
    return this.http.post<SourceResponseModel>(configs.apiBase+'GetSourceByCustomer',`"${encrypted}"`,{ headers: headers })
  }  
  
  GetProductPriceBySourceId(queries:any){
    const encrypted = encryptDES_ECB_PKCS5(JSON.stringify(queries)) 
    return this.http.post<ProductResponseModel>(configs.apiBase+'GetProductByLocSource',`"${encrypted}"`,{ headers: headers })
  }  
  
  GetFinalProductPrice(queries:any){
    const encrypted = encryptDES_ECB_PKCS5(JSON.stringify(queries)) 
    return this.http.post<ProductPriceResponseModel>(configs.apiBase+'GetProductListByLocSourceProdCust?',`"${encrypted}"`,{ headers: headers })
  }
}
