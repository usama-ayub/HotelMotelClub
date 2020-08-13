export interface IUser {
    id: string;
    email: string;
    password: string;
    repassword?: string;
}

export interface IAuth {
    email: string;
    password: string;
    repassword?: string;
}

