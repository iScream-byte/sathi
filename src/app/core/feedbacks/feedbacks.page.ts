import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { CoreService } from 'src/app/services/core.service';
import {
  CAListResponseModel,
  DailyResponseArray,
  DailyVisitReportSearchModel,
} from 'src/app/services/Interfaces';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { MyLoader } from 'src/app/shared/MyLoader';
import { SearchableDropdownComponent } from 'src/app/utils/searchable-dropdown/searchable-dropdown.component';
import { Network } from '@capacitor/network';
import { ToastService } from 'src/app/services/toast.service';
import { DropdownService } from 'src/app/services/dropdown.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.page.html',
  styleUrls: ['./feedbacks.page.scss'],
})
export class FeedbacksPage implements OnInit {
  userDetails: any = {};
  hasNetwork: boolean = null;
  roleType: string = '';
  selectedCaId: string = '';
  userId: string = '';
  message: string = '';

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
    private toast: ToastService
  ) {}

  async ngOnInit() {
    const status = await Network.getStatus();
    if (status.connected) {
      this.hasNetwork = true;
    } else {
      this.hasNetwork = false;
    }

    this.storage.getItem('NSUDloginDetail').then((u) => {
      if (u) {
        this.userDetails = JSON.parse(u);
        this.roleType = this.userDetails.roletype;
        this.userId = this.userDetails.userId;
        if (this.roleType != 'TSL') {
          this.selectedCaId = this.userDetails.ca_id;
        } else {
          this.selectedCaId = '';
          this.toast.presentToast('Unauthorized', 'error');
          setTimeout(() => {
            this.goBack();
          }, 1000);
        }
      }
    });
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
  }

  submit() {
    if (!this.message) {
      this.toast.presentToast('Please enter message', 'error');
      return;
    }
    this.loader.showLoader('submitting...');
    const body = {
      userId: this.userId,
      roletype: this.roleType,
      Feedback: this.message,
    };

    console.log(body);
    this.coreServices.SendFeedback(body).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 'Success') {
          this.toast.presentToast(res.message, 'success');
          this.loader.stopLoader();
        } else {
          this.toast.presentToast(res.message, 'error');
          this.loader.stopLoader();
        }
      },
      (err) => {
        console.log(err);
        this.loader.stopLoader();
      }
    );
  }

  goToMyFeedbacks() {
    this.router.navigate(['', 'feedbacks', 'my-feedback']);
  }
}
