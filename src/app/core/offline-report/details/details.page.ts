import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  dataForSummary:any={}
  constructor(    
    private router: Router,
    private platform: Platform,
    private location: Location,
    private menuController: MenuController,
    private modalController: ModalController,
    private storage: LocalStorageService,
    private loader: MyLoader,
    private coreServices: CoreService,
    private dropdownService: DropdownService,
    private toast: ToastService,
    private acRoute:ActivatedRoute
    ) { }

  ngOnInit() {
    this.acRoute.params.subscribe((p:any)=>{    
      this.dataForSummary = JSON.parse(p['data'])
    })
    // console.log(this.dataForSummary,'hello');
    
  }

  toggleMenu(){
    this.menuController.toggle()    
  }

  goBack() {
    this.location.back();
  }

  async openInApp() {
    await Browser.open({
      url: 'https://www.google.com/maps/search/?api=1&query='+this.dataForSummary.LAT+','+this.dataForSummary.LONG,
      presentationStyle: 'fullscreen',
    });
  }


}
