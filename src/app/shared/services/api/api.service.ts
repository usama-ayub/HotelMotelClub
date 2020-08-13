import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { IResponse } from "src/app/interface/response";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}
  post(path: string, data: any): Observable<IResponse> {
    return this.http.post<IResponse>(path, data);
  }
  get(path: string): Observable<IResponse> {
    return this.http.get<IResponse>(path);
  }
  put(path: string, data: any): Observable<IResponse> {
    return this.http.put<IResponse>(path, data);
  }
  delete(path: string): Observable<IResponse> {
    return this.http.delete<IResponse>(path);
  }
}
