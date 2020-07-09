import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstantsService } from '../constants/app-constants.service';
import { CommanservicesService } from '../services/commanservices.service';
import { EMPTY } from 'rxjs';

declare var $: any;

@Injectable()
export class CrmInterceptor implements HttpInterceptor {
    data: any = {};
    currentSessionData: any = {};
    checkStatus: boolean = false;
    cachedRequests: Array<HttpRequest<any>> = [];
    constructor(private router: Router, private appConstants: AppConstantsService,
        public comman: CommanservicesService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === this.appConstants.UNAUTHORIZED) {
                    // sessionStorage.clear();
                    // this.router.navigate([this.appConstants.UI_URLS['LOGIN']]);
                    this.appConstants.errorMsg('Login required to access this page');
                } else if (err.status === this.appConstants.TOKEN_EXPIRED) {
                    this.checkStatus = true;
                    this.refreshToken(request, next);
                    return EMPTY;
                } else if (err.status === this.appConstants.INTERNAL_SERVER_ERROR) {
                    this.appConstants.errorMsg('Internal server error');
                } else if (err.status === this.appConstants.FORBIDDEN) {
                    this.appConstants.errorMsg('You do not have previledges to access this page.');
                    this.router.navigate(['/login']);
                } else if (err.status === this.appConstants.NOT_FOUND) {
                    this.appConstants.errorMsg('Page not found.');
                }
                return throwError(err);
            }));
    }


    refreshToken(req: HttpRequest<any>, next: HttpHandler) {
        if (this.checkStatus == true) {
            this.currentSessionData = JSON.parse(sessionStorage.getItem('CurrentUser'));
            if (this.currentSessionData) {
                let token = {
                    'deviceUniqueId': this.currentSessionData.deviceUniqueId,
                    'refreshToken': this.currentSessionData.refreshToken
                }
                this.comman.postRequest(token, this.appConstants.SERVER_URLS['GEN_TOKEN']).subscribe(response => {
                    this.checkStatus = false;
                    this.data = response;
                    if (this.appConstants.SUCCESS === response.status) {
                        this.currentSessionData.accessToken = this.data.result.accessToken;
                        this.currentSessionData.refreshToken = this.data.result.refreshToken;
                        sessionStorage.setItem('CurrentUser', JSON.stringify(this.currentSessionData));
                        this.retry(req, next);
                    }
                });
            }
        }
    }

    retry(request, next) {
        // const authHeader = this.appConstants.authHeader();
        // if (authHeader) {
        //     return request.clone({
        //         setHeaders: {
        //             "s_a_t": this.appConstants.authHeader()
        //         }
        //     });
        // }
        return next.handle(request).pipe(retry(3));
    }
}
