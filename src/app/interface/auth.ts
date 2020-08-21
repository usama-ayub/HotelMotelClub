import { IResponse } from './response';

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
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
    password: string;
    repassword?: string;
}

export interface ILoginData {
    email: string;
    token: string;
    userid:number;
    firstName:string;
    middleName:string;
    lastName:string;
    roleId: number;
}

export interface IRegisterData {
    email: string;
    token: string;
}

export type ILoginResponse  = IResponse<ILoginData>
export type IRegisterResponse  = IResponse<IRegisterData>