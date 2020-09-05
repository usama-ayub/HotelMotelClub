import { IResponse } from './response';

export interface IUser {
    id: string;
    email: string;
    password: string;
    repassword?: string;
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


