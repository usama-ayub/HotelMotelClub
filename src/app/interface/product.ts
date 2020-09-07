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
    adId?: number
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

  export type IProductResponse  = IResponse<IProductData>;
  export type IFavouriteProductResponse  = IResponse<Array<IFavouriteProductData>>;