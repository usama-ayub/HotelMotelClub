export interface IResponse<T> {
    data: T;
    success: boolean;
    status: string;
    message: string
}
