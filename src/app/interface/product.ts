import { IResponse } from './response';

export interface IProduct {
    description: string;
    pictures: Array<IProductImage>;
    price: number;
    userId: number,
    cityId: number,
    stateId: number,
    countryId: number,
    subCategoryId: number,
    title: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    tags: string[],
    type: string,
    pageNumber?: number,
    pageSize?: number,
    adId?: number
  }
  
  export interface IProductImage {
    image?: string;
    picture?:string;
    coverImage: boolean,
    isImageSaved?: boolean
  }

  export interface IProductData {
    description: string;
    pictures?: Array<IProductImage>;
    images?: Array<IProductImage>;
    price: number;
    userId: number,
    city: string,
    contact: string,
    stateId: number,
    country: string,
    subCategoryId: number,
    title: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    tags: string[],
    type: string,
    pageNumber?: number,
    pageSize?: number,
    adId?: number,
    categoryId?:number
  }
  export interface IFavouriteProduct {
    userId: number,
    pageNumber?: number,
    pageSize?: number,
    adId?: number
  }

  export interface IFavouriteProductData {
    adId: number,
    coverImage?: any,
    price: number,
    title: string,
    total:number
  }

  export interface IProductList {
    countryId?: number,
    stateId?: number,
    cityId?: number,
    title?: string,
    minPrice?: number,
    min?: number,
    maxPrice?: number,
    max?: number,
    categoryId?: number,
    subCategoryId?: number,
    type?: string,
    pageNumber: number
  }

  export interface IProductListData {
    city: string,
    coverImage: string,
    featureOn: any,
    price: number,
    tags: string,
    title: string
  }
  export type IProductResponse  = IResponse<IProductData>;
  export type IProductListResponse  = IResponse<Array<IProductListData>>;
  export type IFavouriteProductResponse  = IResponse<Array<IFavouriteProductData>>;