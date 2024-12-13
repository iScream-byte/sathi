import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-view-topup-permit',
  templateUrl: './view-topup-permit.page.html',
  styleUrls: ['./view-topup-permit.page.scss'],
})
export class ViewTopupPermitPage implements OnInit {

  constructor(
    private menuController: MenuController,
    private router: Router,
    private platform: Platform,
    private location: Location
  ) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  goBack() {
    this.location.back();
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }


}
