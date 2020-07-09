import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserXhr, HttpModule } from '@angular/http';
import { NgProgressModule, NgProgressBrowserXhr, NgProgressInterceptor } from 'ngx-progressbar';
import { HeaderComponent } from './component/header/header.component';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CrmInterceptor } from './interceptor/crm.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './component/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeaddComponent } from './component/employeeadd/employeeadd.component';
import { EmployeelistComponent } from './component/employeelist/employeelist.component';






export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EmployeeaddComponent,
    EmployeelistComponent

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgProgressModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CrmInterceptor,
      multi: true
    },
   
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
