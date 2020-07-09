import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppConstantsService {

  constructor(public translate: TranslateService) { }

  public version = 1.0;

  public HOME_URL: string = environment.serverUrl;

  public SUCCESS: number = 200;
  public UNAUTHORIZED: number = 401;
  public FORBIDDEN: number = 403;
  public NOT_FOUND: number = 404;
  public TOKEN_EXPIRED: number = 412;
  public INTERNAL_SERVER_ERROR: number = 500;
  public REQUIRED_FIELD_EMPTY: number = 601;
  public UNIQUE_KEY_EXISTS: number = 602;
  public PASSWORD_MISMATCHED: number = 603;
  public USER_NOT_FOUND: number = 604;
  public USER_NOT_ACTIVE: number = 607;
  public USER_IS_LOCKED: number = 608;
  public DUPLICATE_PRODUCT_NAME = 1001;
  public AMC_LOST = 1101;
  public DUPLICATE_ACCOUNT_NAME = 1201;
  public EMAIL_ALREADY_EXISTS = 602;
  public DUPLICATE_CONTACT_NAME = 1301;
  public AMC_HAS_SERVICE = 1102;
  public translateMessage(key, callback) {
    return this.translate.get('messages.' + key).subscribe((res: string) => {
      callback(res);
    });
  }

  public SERVER_URLS: any = {
'EMPADD':'employee/addemployee',
'EMPEDIT':'employee/editemployee',
'EMPBYID':'employee/details/',
'EMPDELETE':'employee/',
"EMPLIST":"/employee/list"
    
  };
  public UI_URLS: any = {
    'LOGIN': '/web/login',
    'HOME': '/web/home',

  };

  /**
     * Success Message Method
     */
  public successMsg(statusCode) {
    this.translateMessage(statusCode, (message) => {
      var x = document.getElementById("success-snackbar");
      document.getElementById('success-snackbar').style.animation = 'bounceInDown faster'
      x.innerHTML = '<div><span class="imgsuccess"><img  src=\'assets/img/check.svg\'></span></div>&nbsp;&nbsp;' + '<span class="successhead">' + 'Success' +
        '</span>' + '<br>' + '<span class="successmsg">' + statusCode + '</span>';
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    });

  }

  /**
   * Error Message Method
   */
  public errorMsg(statusCode) {
    this.translateMessage(statusCode, (message) => {
      var x = document.getElementById("error-snackbar");
      x.innerHTML = '<div><span class="imgsuccess"><img  src=\'assets/img/error.svg\'></span></div>&nbsp;&nbsp;' + '<span class="successhead">' + 'Error' +
        '</span>' + '<br>' + '<span class="successmsg">' + statusCode + '</span>';
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
    });
  }

  /** 
   * Get token from session storage and generate authorization header
  */
  public authHeader() {
    // if (sessionStorage.getItem('CurrentUser')) {
    //   var user = JSON.parse(sessionStorage.getItem('CurrentUser'));

    //   return btoa(user.accessToken + ":" + user.userUniqueId + ":" + user.deviceUniqueId);
    // } else {
    //   return null;
    // }

    return 'MmY5Y2ViYzM5Y2ZmMjdlZGU4MDQ1ODRmOGQzYzRjZmY2NzJhYWM1OWFlOGZkZmQyYzUxZDc3OWIzYzgzYzc1NzEzZmUxYzAyNmYzNmY5MmMyMzYxYjdhM2Y4NTI4ZmM1Y2E5NzE0YjkzNTg5MDdlODk0NGYxMDRlY2NjN2Y5ZTU6VVNSMjAyMDAxMTMxNzQ5MDc0MjI6REVWMjAyMDAxMTMxNzQ5MDgwMDA='

  }

  //GetCommam app setting  List
  getConstantList(type: string) {
    let list = [];
    let constantList = [];
    if (sessionStorage.getItem('commaAppSetting')) {
      constantList = JSON.parse(sessionStorage.getItem('commaAppSetting'));
    }
    constantList.forEach(element => {
      if (element.listItemType == type) {
        list.push(element);
      }
    });
    list.sort((a, b) => 0 - (a > b ? -1 : 1));
    return list;
  }
}
