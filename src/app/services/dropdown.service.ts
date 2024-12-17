import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configs } from './../../environments/configs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http:HttpClient) { }

  GetIndustryList(){
    return this.http.get(configs.apiBase+'GetIndustryType')
  }
}
