import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  standalone:true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports:[CommonModule,IonicModule]
})
export class FooterComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  navigateTo(url:string){
    this.router.navigate([url])
  }

}
