import { Component, OnInit } from '@angular/core';
import { CommanservicesService } from 'src/app/services/commanservices.service';
import { AppConstantsService } from 'src/app/constants/app-constants.service';
import { Router } from '@angular/router';
import { Form, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: any = [];
  logindata: any = {};
  public signUp: any = {};
  public  username:any;
  public password:any;

  platform: any;
 
  message: any;
  selectedTab: any ;
  constructor(private commanservicesService: CommanservicesService,
    public constant: AppConstantsService,
    public router: Router) { }

  ngOnInit() {
    this.selectedTab='loginpage';
    
  }

  login() { 
    console.log(JSON.stringify(this.logindata))
    this.username="demo@gmail.com";
    this.password="demo123";
    this.commanservicesService.Loginrequest(this.logindata, 'manager/login').subscribe(response => {
      this.data = response;
      if (this.constant.SUCCESS === response.status) {
    
        this.router.navigate(['/employeeadd']);
      }
    });
  }

  gotoregister(tab) {
    this.selectedTab = tab;
  }


  doSingUp(signUpform: NgForm) {
    this.signUp.firstName = name[0];
    this.signUp.lastName = name[1];
 
    this.commanservicesService.Loginrequest(this.logindata, 'manager/sign-up')
          .subscribe((response) => {
            this.data = response;
            if (this.constant.SUCCESS == this.data.status) {
              this.constant.successMsg('User Register Successfully');
              signUpform.resetForm();
              this.router.navigate(['']);
              this.selectedTab = 'loginpage';
             
            }
            else {
              this.constant.errorMsg(this.data.message);
        
            }
          }), err => {
            this.constant.errorMsg(this.data.message);
        
          };
      }
    }
   
  


