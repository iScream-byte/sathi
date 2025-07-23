import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configs } from 'src/environments/configs';
import { LoginResponseModel } from './Interfaces';
import { HttpHeaders } from '@angular/common/http';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
}); 
@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private http:HttpClient) {}


  LoginRequest(body: any) {   
    return this.http.post(
      configs.apiBase + 'userLogin',
      body,
      { headers: headers }
    );
  }  
  
  ChangePassword(body:any){
    return this.http.post(
      configs.apiBase + `ChangePassword`,
      body,
      { headers: headers }
    );
  }  
  
  ValidateUser(queries){
    return this.http.get(
      configs.apiBase + `ValidateUser?`+queries      
    );
  }  
  
  ValidateOTP(queries){
    return this.http.get(
      configs.apiBase + `ValidateOTP?`+queries      
    );
  }
}
