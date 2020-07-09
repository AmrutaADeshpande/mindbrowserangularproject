import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstantsService } from '../constants/app-constants.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

declare var jquery: any;
declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class CommanservicesService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  headers: Headers;
  timeZone: any;
  constructor(private router: Router, public http: HttpClient, public appConstants: AppConstantsService, ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append('Accepts', '*/*');
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  sendMessage(message) {
    this.subject.next(message);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * Post Request
   */

  getRequest(url: string): Observable<any> {
    return this.http.get<any>(this.appConstants.HOME_URL + url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 's_a_t': this.appConstants.authHeader() })
    });
  }

  postRequest(data: any, url: string): Observable<any> {
    return this.http.post<any>(this.appConstants.HOME_URL + url, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 's_a_t': this.appConstants.authHeader(), 'timezone': this.timeZone }) });
  }

  putRequest(data: any, url: string): Observable<any> {
    return this.http.put<any>(this.appConstants.HOME_URL + url, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 's_a_t': this.appConstants.authHeader(), 'timezone': this.timeZone }) });
  }

  Loginrequest(data: any, url: string): Observable<any> {
    console.log(JSON.stringify(data))
    return this.http.post<any>(this.appConstants.HOME_URL + url, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  deleteRequest(url: string): Observable<any> {
    return this.http.delete<any>(this.appConstants.HOME_URL + url, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 's_a_t': this.appConstants.authHeader()}) });
  }

  importMultipart(file: any, url: string): Observable<any> {
    let data=new FormData();
    console.log(data);
   data.append('file',file);
   
    
    return this.http.post<any>(this.appConstants.HOME_URL + url, data, { headers: new HttpHeaders({ 's_a_t': this.appConstants.authHeader(), 'timezone': this.timeZone }) });
  }

  checkPermission(modulename, actionname) {
    let permission = false;
    if (null != sessionStorage.getItem('securityActions')) {
      JSON.parse(sessionStorage.getItem('securityActions')).forEach((value, key) => {
        if (value.module === modulename && value.actionName === actionname) {
          permission = true;
        }
      });
    }
    return permission;
  }
}
