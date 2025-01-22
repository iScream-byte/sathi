import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configs } from 'src/environments/configs';
import { LoginResponseModel } from './Interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private http:HttpClient) { }


  LoginRequest(username:string,password:string){
    return this.http.get<LoginResponseModel>(
      configs.apiBase + `userLogin?username=${username}&password=${password}`      
    );
  }  
  
  ChangePassword(queries){
    return this.http.get(
      configs.apiBase + `ChangePassword?`+queries      
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
