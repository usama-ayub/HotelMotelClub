import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from "rxjs/index";
import { ICategoryResponse, ICategory } from 'src/app/interface/category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient) { }

  getCategory() : Observable<Array<ICategory>>{
    let url: string  = 'Category/fetchadcategories';
    return this.http.get<ICategoryResponse>(url).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      res.data.map(c=>c.isCollapse = true);
      return of(res.data)
    }))
  }
}
