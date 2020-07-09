import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CommanservicesService } from '../../services/commanservices.service';
import { Router } from '@angular/router';
import { AppConstantsService } from 'src/app/constants/app-constants.service';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  listemployeeData: any = [];
  data: any = {};
  details: any = {};
  pageNum: any = 1;
  formData: any;
 
  listCount: number;
  

  pagination: any = { pagNum: 1, numPerPage: 10 };
  constructor(private commonServicesService: CommanservicesService,
    private contstant: AppConstantsService, private route: Router) {

  }
  ngOnInit() {
    this.employeeDetails();
  }


  employeeDetails() {

    this.pagination.pageNum = this.pageNum;
    this.pagination.numPerPage = 10;

    this.commonServicesService.postRequest(this.pagination, this.contstant.SERVER_URLS['EMPLIST']).subscribe(response => {
      this.data = response;
      if (this.contstant.SUCCESS == this.data.status) {
        this.listemployeeData = this.data.result;
        console.log(this.listemployeeData)
        if (this.data.listCount) {
          this.listCount = this.data.listCount;
        }
       
      } else {
       
        this.contstant.errorMsg(this.data);
      }
    }, error => {
     
      this.contstant.errorMsg('Something is wrong..Please try again.....');
    });

  }
  getDetails(pagNum) {

    this.pageNum = pagNum;
    this.employeeDetails();
  }
  goToaddemp(id) {

    this.route.navigate(['/employee/employeeadd', id])

  }


  deleteemp(id)
  {
    this.commonServicesService.deleteRequest(this.contstant.SERVER_URLS['EMPDELETE'] +id).subscribe(response => {
      this.data = response;
      if (this.contstant.SUCCESS == this.data.status) {

        this.employeeDetails();
        

      }
    });
  }

}
