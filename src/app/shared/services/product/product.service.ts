import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable, of, throwError, BehaviorSubject } from "rxjs/index";
import { ICategoryResponse, ICategory } from 'src/app/interface/category';
import { IFavouriteProduct, IProduct, IProductResponse, IFavouriteProductResponse, IFavouriteProductData, IProductData, IProductList, IProductListResponse, IProductListData } from 'src/app/interface/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  isFavouriteHit$ = new BehaviorSubject<boolean>(false); 
  isSearch:string = ''; 
  isSearcheHit$ = new BehaviorSubject<boolean>(false); 
  constructor(private http: HttpClient) { }

  getCategory() : Observable<Array<ICategory>>{
    let url: string  = 'Category/fetchadcategories';
    return this.http.get<ICategoryResponse>(url).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      res.data.map(category=>category.isCollapse = false);
      return of(res.data)
    }))
  }

  getFavouriteProduct(paylaod: IFavouriteProduct) : Observable<Array<IFavouriteProductData>>{
    let url: string  = 'Favourite/all';
    return this.http.post<IFavouriteProductResponse>(url, paylaod)
    .pipe(
      switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }
  getMyAds(paylaod: IFavouriteProduct) : Observable<Array<IFavouriteProductData>>{
    let url: string  = 'product/myproducts';
    return this.http.post<IFavouriteProductResponse>(url, paylaod).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  addFavouriteProduct(paylaod: IFavouriteProduct) : Observable<number>{
    let url: string  = 'Favourite/add';
    return this.http.post<{success:boolean,message:string,data:number}>(url, paylaod).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      this.isFavouriteHit$.next(true);
      return of(res.data);
    }))
  }

  removeFavouriteProduct(paylaod: IFavouriteProduct) : Observable<number>{
    let url: string  = 'Favourite/remove';
    return this.http.post<{success:boolean,message:string,data:number}>(url, paylaod).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      this.isFavouriteHit$.next(true);
      return of(res.data)
    }))
  }
  
  createProduct(paylaod: IProduct) : Observable<number>{
    let url: string  = 'product/new';
    return this.http.post<{success:boolean,message:string,data:number}>(url, paylaod).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

  adsDetail(paylaod: IFavouriteProduct): Observable<IProductData>{
    let url: string  = 'product/productdetails';
    return this.http.post<IProductResponse>(url, paylaod).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }
  getAdsList(payload:IProductList): Observable<Array<IProductListData>>{
    let url: string  = 'product/all';
    return this.http.post<IProductListResponse>(url, payload).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }
  removeProduct(id:number): Observable<number>{
    let url: string  = `product/delete?AdId=${id}`;
    return this.http.post<{success:boolean,message:string,data:number}>(url, {}).pipe(switchMap(res => {
      if(!res.success){
        return throwError(res.message)
      }
      return of(res.data)
    }))
  }

}
