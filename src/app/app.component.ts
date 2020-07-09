import { Component } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { Router, Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, } from '@angular/router';
import { AppConstantsService } from './constants/app-constants.service';
import { NgForm } from '@angular/forms';

import { CommanservicesService } from './services/commanservices.service'


declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  loading = true;
  currentSessionData: any = {};
  securityActions: any = [];
  changepassword: any = {};
  data: any;
  isChangePasswordRequired: any;
  constructor(public ngProgress: NgProgress,
    public comman: CommanservicesService,
    public constant: AppConstantsService,
    public router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    });
    this.currentSessionData = JSON.parse(sessionStorage.getItem('CurrentUser'));
  }

  ngOnInit() {
    this.currentSessionData = JSON.parse(sessionStorage.getItem('CurrentUser'));
    if (this.currentSessionData && this.currentSessionData.userId) {
      // this.router.navigate([""]);
    }
    else {
      // this.router.navigate(["/login"]);
    }
  }



  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
      this.ngProgress.start();
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
      this.ngProgress.inc(20);
      this.ngProgress.done();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
      this.ngProgress.done();
    }
    if (event instanceof NavigationError) {
      this.loading = false;
      this.ngProgress.done();
    }
  }
  onActivate(event) {
    window.scroll(0, 0);
  }


}
