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
    tags: string,
    type: string,
  }
  
  export interface IProductImage {
    image: string;
    coverImage: boolean,
  }


  export interface IFavouriteProduct {
    userId: number,
    pageNumber?: number,
    pageSize?: number,
    adId?: number
  }

  export type IProductResponse  = IResponse<any>;
  export type IFavouriteProductResponse  = IResponse<any>;