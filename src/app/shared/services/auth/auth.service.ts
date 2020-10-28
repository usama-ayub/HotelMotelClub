import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from "rxjs/index";
import { HttpClient } from "@angular/common/http";
import { ILogin, ILoginResponse, IRegister, IRegisterResponse, ILoginData, IRegisterData } from 'src/app/interface/auth';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isAuth$ = new BehaviorSubject<boolean>(false); 
  authGarudPath = ['/create-product', '/ads', '/favourite', '/setting'];
  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    let token = localStorage.getItem('token');
    if(token) {
      this.isAuth$.next(true);
    }
    console.log(this.router)
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

  register(paylaod: IRegister): Observable<IRegisterData> {
    let url: string = 'Auth/register';
    return this.http.post<IRegisterResponse>(url, paylaod).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    this.isAuth$.next(false);
    if(this.authGarudPath.includes(this.router.url)){
      this.router.navigate(['/login']);
   }
  return of(true)
  }

  getUserVerify(id:number): Observable<any>{
    let url: string  = `Auth/verification?Id=${id}`;
    return this.http.get<any>(url,{})
    .pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }
}
