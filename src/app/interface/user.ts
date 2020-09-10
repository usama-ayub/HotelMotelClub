import { IResponse } from './response';

export interface IUser {
    userid?:number,
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    primaryContact: number;
    secondaryContact: number;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    preferredContact: number;
}
export interface ICountryData {
    countryId: number;
    countryName: string;
}

export interface IStateData {
    stateId: number;
    stateName: string;
}

export interface ICityData {
    cityId: number;
    cityName: string;
}


export type ICountryResponse  = IResponse<Array<ICountryData>>;
export type IStateResponse  = IResponse<Array<IStateData>>;
export type ICityResponse  = IResponse<Array<ICityData>>;
export type IUserResponse  = IResponse<IUser>;


