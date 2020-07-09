import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommanservicesService } from 'src/app/services/commanservices.service';
import { Router } from '@angular/router';
import { AppConstantsService } from 'src/app/constants/app-constants.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;
  data: any = {};
  headerbackColor: any;
  logData: any = {};

  constructor(
    public common: CommanservicesService,
    public constant: AppConstantsService,
   
    public router: Router, ) {
  
    this.subscription = this.common.getMessage().subscribe(message => {
      this.headerbackColor = message;
    })

  }

  ngOnInit() {

    if (!this.headerbackColor) {
      this.headerbackColor = "#343a40";
    }

  }

  signout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  

 
}
