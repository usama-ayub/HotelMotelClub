import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from "rxjs/index";
import { ICountryResponse, IStateResponse, ICityResponse, ICountryData, IStateData, ICityData } from 'src/app/interface/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCountry() : Observable<Array<ICountryData>>{
    let url: string  = 'Country/dd/countries';
    return this.http.get<ICountryResponse>(url).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  getState(CountryId: number) : Observable<Array<IStateData>>{
    let url: string  = 'State/dd/states';
    return this.http.post<IStateResponse>(url,{countryId :CountryId}).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  getCity(StateId: number) : Observable<Array<ICityData>>{
    let url: string  = 'City/dd/cities';
    return this.http.post<ICityResponse>(url,{stateId:StateId}).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  verifyPassword(password: string) : Observable<number>{
    let url: string  = `User/verifypassword?password=${password}`;
    return this.http.post<{success:boolean,message:string,data:number}>(url,{}).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  updatePassword(password: string) : Observable<number>{
    let url: string  = `User/updatepassword?password=${password}`;
    return this.http.post<{success:boolean,message:string,data:number}>(url,{}).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

}
