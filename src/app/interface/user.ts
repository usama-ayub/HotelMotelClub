import { IResponse } from './response';

export interface IUser {
    id: string;
    email: string;
    password: string;
    repassword?: string;
}

export type ICountryResponse  = IResponse<any>;
export type IStateResponse  = IResponse<any>;
export type ICityResponse  = IResponse<any>;


