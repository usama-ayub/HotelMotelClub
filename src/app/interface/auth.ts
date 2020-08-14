import { IResponse } from './response';

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
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
    password: string;
    repassword?: string;
}

export type ILoginResponse  = IResponse<ILoginData>
export type IRegisterResponse  = IResponse<IRegisterData>