import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from "rxjs/index";
import { ICountryResponse, IStateResponse, ICityResponse } from 'src/app/interface/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCountry() : Observable<any>{
    let url: string  = '/Country/dd/countries';
    return this.http.get<ICountryResponse>(url).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  getState(CountryId: number) : Observable<any>{
    let url: string  = '/State/dd/states';
    return this.http.post<IStateResponse>(url,{countryId :CountryId}).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  getCity(StateId: number) : Observable<any>{
    let url: string  = '/City/dd/cities';
    return this.http.post<ICityResponse>(url,{stateId:StateId}).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

}
