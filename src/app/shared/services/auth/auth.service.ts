import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from "rxjs/index";
import { HttpClient } from "@angular/common/http";
import { ILogin, ILoginResponse, IRegister, IRegisterResponse, ILoginData } from 'src/app/interface/auth';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isAuth$ = new BehaviorSubject<boolean>(false); 

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    if(token) {
      this.isAuth$.next(true);
    }
   }

  login(paylaod: ILogin): Observable<ILoginData> {
    let url: string = 'Auth/login';
    return this.http.post<ILoginResponse>(url, paylaod).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  register(paylaod: IRegister): Observable<IRegisterResponse> {
    let url: string = '';
    return this.http.post<IRegisterResponse>(url, paylaod)
  }

  logout(): Observable<any> {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.isAuth$.next(false);
    return of(true)
  }
}
