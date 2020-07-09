import { Component, OnInit } from '@angular/core';
import { CommanservicesService } from '../../services/commanservices.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AppConstantsService } from 'src/app/constants/app-constants.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employeeadd',
  templateUrl: './employeeadd.component.html',
  styleUrls: ['./employeeadd.component.scss']
})
export class EmployeeaddComponent implements OnInit {
  customer:any={};
  data:any={};
  employeecontain:any={};
  id:any={};

  constructor( private commonServicesService:CommanservicesService,
    private contstant: AppConstantsService,
    private rout: ActivatedRoute ,
    private router: Router) {
      this.rout.params.subscribe(params => {
        this.id = +params['id'];
      })
      if(this.id){
      this.detailbyid( this.id);
      }
     }

  ngOnInit() {
    
  }
  AddOredit(employeeDetails :NgForm){
    if(this.customer.empId){
    this. editemployee(employeeDetails)
    }else{
    this.addemployee(employeeDetails) 
   }
  }

  //Add Employee Details
  addemployee(employeeDetails :NgForm)
  {
     let type = document.activeElement.getAttribute('name');   
    this.commonServicesService.postRequest(this.customer,this.contstant.SERVER_URLS['EMPADD']).subscribe( response => {
      this.data = response;
      if (this.contstant.SUCCESS == this.data.status) {
           
        employeeDetails.resetForm();
        if (type == "save") {    
          this.contstant.successMsg('Employee ADD Successfully');
          this.router.navigateByUrl('/');
        } 
      }
      else {
        this.contstant.errorMsg(this.data.message);
      }
    }, error => {
      this.contstant.errorMsg('Something is wrong..Please try again.....');
    });

  }

// Edit Employee Details
  editemployee(employeeDetails :NgForm)
  {
    let type = document.activeElement.getAttribute('name');
    this.commonServicesService.putRequest(this.customer,this.contstant.SERVER_URLS['EMPEDIT']).subscribe( response => {
      this.data = response;
      if (this.contstant.SUCCESS == this.data.status) {
        employeeDetails.resetForm();
        if (type == "save") {      
          this.router.navigateByUrl('/');
          this.contstant.successMsg('Employee Edit Successfully');
        }       
      }
      else {
        this.contstant.errorMsg(this.data.message);
      }
    }, error => {
      this.contstant.errorMsg('Something is wrong..Please try again.....');
    });
  }



  detailbyid(id)
  {
    this.commonServicesService.getRequest(this.contstant.SERVER_URLS['EMPBYID'] +id).subscribe(response => {
      this.data = response;
      if (this.contstant.SUCCESS == this.data.status) {

        this. customer = this.data.result;
        console.log(JSON.stringify( this. customer ));

      }
    });
  }


  







}
