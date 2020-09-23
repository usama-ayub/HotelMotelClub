import { IResponse } from './response';

export interface IFAQData {
    id: number;
    question: string;
    answer: string;
    active: boolean;
    priority: number;
}
export interface IPolicyData {
    id: number;
    policy: string;
    createdOn: string;
    active: boolean;
}


export type IFAQResponse  = IResponse<Array<IFAQData>>;
export type IPolicyResponse  = IResponse<Array<IPolicyData>>;