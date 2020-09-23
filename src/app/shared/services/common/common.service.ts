import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from "rxjs/index";
import { IFAQData, IFAQResponse, IPolicyData, IPolicyResponse } from 'src/app/interface/common';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  preferredContact:Array<{type:string,value:number}>= [
    {type:'Primary Contact',value:1},
    {type:'Secondary Contact',value:2}
  ]
  public isMenuShow:boolean = false;
  errorObj = {
    message: '',
    error: false
  }
  successObj = {
    message: '',
    success: false
  }
  warningObj = {
    message: '',
    warning: false
  }

  constructor(private http: HttpClient) { }

  getFAQ() : Observable<Array<IFAQData>>{
      let url: string  = 'FAQ/all/0';
      return this.http.post<IFAQResponse>(url,{}).pipe(switchMap(res => {
        if(!res.success){
          return throwError(res.message)
        }
        return of(res.data)
      }))
  }

  getPolicy() : Observable<Array<IPolicyData>>{
      let url: string  = 'Policy/GetPolicy/0';
      return this.http.post<IPolicyResponse>(url,{}).pipe(switchMap(res => {
        if(!res.success){
          return throwError(res.message)
        }
        return of(res.data)
      }))
  }

  getUserId(): number{
    let userID = localStorage.getItem('userid');
    return Number(userID)
  }
  error(message:string) :void {
    this.errorObj.error = true;
    this.errorObj.message = message;
    setTimeout(()=>{
      this.errorObj.error = false;
    },2000)
  }

  warning(message:string) :void {
    this.warningObj.warning = true;
    this.warningObj.message = message;
    setTimeout(()=>{
      this.warningObj.warning = false;
    },3000)
  }

  success(message:string) :void {
    this.successObj.success = true;
    this.successObj.message = message;
    setTimeout(()=>{
      this.successObj.success = false;
    },2000)
  }
}
