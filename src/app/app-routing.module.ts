import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import{EmployeeaddComponent}from'./component/employeeadd/employeeadd.component';
import{EmployeelistComponent}from'./component/employeelist/employeelist.component'


const routes: Routes = [
 
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: EmployeelistComponent
  },
  {
    path: 'employeeadd',
    component: EmployeeaddComponent
  },
  {
    path: 'employee/employeeadd/:id',
    component: EmployeeaddComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
