import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from "rxjs/index";
import {ApiResponse} from "../domains/api.response";
import {User} from "../domains/user.model";
import {WebDashboard, MobileAttendance, ChequeModel, HRListValues} from "../domains/webdashboard.model";
import {catchError} from "rxjs/internal/operators";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable()
export class ApiAuth {

  demo: boolean =false;
   //baseUrl: string ='http://localhost:8091/api/';
   baseUrl: string = 'http://hinawi2.dyndns.org:8091/api/';
  //baseUrl: string;

    constructor(private http: HttpClient) {
      let url = window.location.href;
      this.demo= url.indexOf("demo")>0;
      if (this.demo==true) {
        //this.baseUrl = 'http://hinawi2.dyndns.org:8092/api/';
        //this.baseUrl = 'https://test.hinawionline.com/api/';
        this.baseUrl = 'https://hinawiapi.azurewebsites.net/api/';
      }
      else{
        this.baseUrl = 'http://hinawi2.dyndns.org:8091/api/';
        //this.baseUrl = 'https://test.hinawionline.com/api/';
        //this.baseUrl = 'http://localhost:5000/api/';
        //this.baseUrl = 'https://hinawiapi.azurewebsites.net/api/';
      }
      //this.baseUrl = baseUrl;
    }
     isAuthenticated(): boolean {
      //return true;
    return localStorage.getItem('token') != null && !this.isTokenExpired();

  }
    getUserRole(): String {
    return localStorage.getItem('role');
  }

  isTokenExpired(): boolean {
    return false;
  }
     getIsAuthenticated(user: any):Observable<any>{
      // authenticate
         return this.http.post<ApiResponse>(this.baseUrl + 'authenticate', user);
           // .catch((err) => {
           //   alert(err);
           //   return Observable.throw(err)
           // });
      //return this.http.post<ApiResponse>(this.baseUrl+'loginUser', user);
      //return this.http.post<ApiResponse>(this.baseUrl+'rest-employees/getLoginUser',user);
  }

    loginUser(user: User): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl+'loginUser', user);
    }

    getCustomersList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.baseUrl+'customersList');
    }

    getProspectiveList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.baseUrl+'prospectiveList');
    }

      getProspectiveSortedList(): Observable<ApiResponse> {
          return this.http.get<ApiResponse>(this.baseUrl+'prospectiveSortedList');
      }


   getProspectiveContactsList(recNo:any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'prospectiveContactsList?recNo='+recNo);
  }


   saveProspectives(prospective: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'saveProspectives',prospective);
  }

  getVendorsList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'vendorsList');
  }

  getCustomersBalance(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'customersBalance');
  }

  getVendorsBalance(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'vendorsBalance');
  }

  getmessagesList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'messagesList');
  }

  getstudentsList(): Observable<ApiResponse>{
      return this.http.get<ApiResponse>(this.baseUrl+'studentsList');
  }


  getUserDashboards(userId): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl+'getUserDashboards?userId='+userId);
  }

  addWebDashboard(webDashboard: WebDashboard): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'addWebDashBoard',webDashboard);
  }

  deleteWebDashBoard(webDashboard: WebDashboard): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'deleteWebDashBoard',webDashboard);
  }

   getMobileAttendanceList(month: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'attendance/mobileAttendance?month='+month);
  }

  addMobileAttendance(mobileAttendance: MobileAttendance): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'attendance/addMobileAttendance',mobileAttendance);
      // .pipe(
      //   catchError(this.handleError)
      // );
  }

   checkIfUserCheckedIn(userId:any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'attendance/checkIfUserCheckedIn?userId='+userId);
  }

  findLastUserVisit(userId:any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'attendance/findLastUserVisit?userId='+userId);
  }


  getCUCList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'accounting/cuc?name=s');
  }

  getPOList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'accounting/po');
  }

  approvePO(chequeModel: ChequeModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'accounting/approvepo',chequeModel);
  }

  getPettyCashList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'accounting/pettycash');
  }

  getPettyCashChart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+'accounting/pettycashchart');
  }

  getQuotationChartByYear(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+'accounting/quotationChartByYear');
  }

  getFlatsByStatusChart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+'realestate/flatsByStatus');
  }

  getHRListFields(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'list/hrListFields');
  }

  getHRListValues(fieldId): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'list/hrListValues?fieldId='+fieldId);
  }
  getHRSubListValues(fieldId,subId): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'list/hrSubListValues?fieldId='+fieldId+'&subId='+subId);
  }
   saveHRListValues(hrListValues: HRListValues): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'list/saveHRListValues',hrListValues);
  }
  deleteHRListValues(hrListValues: HRListValues): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'list/deleteHRListValues',hrListValues);
  }

  saveProspectiveContact(prospectiveCotact: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'saveProspectiveContact',prospectiveCotact);
  }

  getSalesRepList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'list/salesRepList');
  }
  getProspectiveStatusHistory(custKey): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'list/prospectiveStatusHistory?custKey='+custKey);
  }

  getEmployeesList(active): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'list/employeesList?active='+active);
  }

  handleError(error: HttpErrorResponse){
    console.log("lalalalalalalala");
    alert(error.message);
    return throwError(error);
  }

  //reports region
  getActiveUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'reports/activeUsers');
  }
   getDailyAttendanceReport(month:any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'reports/attendanceDaily?month='+month);
  }
  getMonthlyAttendanceReport(month:any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'reports/attendanceMonthly?month='+month);
  }

  // getAttendanceByReasonReport(month:any, userId:any): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.baseUrl + 'reports/attendanceByReason?month='+month+'&userId='+userId);
  // }

  getAttendanceByReasonDailyReport(month:any, userId:any,start:any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'reports/attendanceByReason?month='+month+'&userId='+userId+'&start='+start);
  }

  getAbsenceReport(start:any, end:any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'reports/getAbsenceReport?start='+start+'&end='+end);
  }

  getAttendanceByMovement(userId:any, start:any, end:any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'reports/attendanceByMovement?start='+start+'&end='+end+'&userId='+userId);
  }
}
