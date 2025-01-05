import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { DailyResponseArray } from 'src/app/services/Interfaces';
import { MyLoader } from 'src/app/shared/MyLoader';
import { Browser } from '@capacitor/browser';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Component({
  selector: 'app-visit-summary-details',
  templateUrl: './visit-summary-details.page.html',
  styleUrls: ['./visit-summary-details.page.scss'],
})
export class VisitSummaryDetailsPage implements OnInit {
  dataForSummary:any
  customerType : string;
  noImagePANString: string;
  noImageAadharString: string;
  noImageLicenseString: string;
  productManufactured: string;
  OtherSelected : boolean = true;
  constructor(
    private platform: Platform, 
    private location: Location,
    private menuController: MenuController,
    private acRoute:ActivatedRoute,
    private loader:MyLoader,
    private iab: InAppBrowser
  ) {  }

  ngOnInit() {
    this.loader.showLoader()
  }

  ionViewWillEnter(){
    this.acRoute.params.subscribe(p=>{
      this.dataForSummary=JSON.parse(p['data'])
      console.log(this.dataForSummary);
      
      if (this.dataForSummary.CategoryID == "1") {
        this.customerType = "Institutional";
      } else if (this.dataForSummary.CategoryID == "2") {
        this.customerType = "Retail";
      }
    })
  }
  

  ionViewDidEnter() {
    setTimeout(() => {
      this.loader.stopLoader()
    }, 2000);
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }


  goBack(){
    this.location.back();
  }

  toggleMenu(){
    this.menuController.toggle()    
  }

  openBrowser() {
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query='+this.dataForSummary.LAT+','+this.dataForSummary.LONG, '_self', {
      location: 'no', 
      zoom: 'no',      
      toolbar: 'no', 
    });

    browser.on('loadstart').subscribe(() => {
    });

    browser.on('loadstop').subscribe(() => {
    });

    browser.on('exit').subscribe(() => {
    });
  }

  async openInApp() {
    // Open a URL inside the app using Capacitor Browser
    await Browser.open({
      url: 'https://www.google.com/maps/search/?api=1&query='+this.dataForSummary.LAT+','+this.dataForSummary.LONG,
      presentationStyle: 'fullscreen', // For iOS, use 'fullscreen' or 'popover'
    });
  }

}
