import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs/index";
import { ApiService } from '../api/api.service';
import { IAuth } from "src/app/interface/user";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  login(paylaod:IAuth): Observable<any>{
    let url: string = '';
    return this.api.post(url,paylaod)
  }

  register(paylaod:IAuth): Observable<any>{
    let url: string = '';
    return this.api.post(url,paylaod)
  }

  logout(): Observable<any> {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    return of(true)
  }
}
