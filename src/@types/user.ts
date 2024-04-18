import { Request } from "express";

export interface CreateUser extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    }
}

export interface VerifyEmailRequest extends Request {
    body: {
        token: string;
        userId: string;
    }
}

export interface ReVerifyEmailRequest extends Request {
    body: {
        userId: string;
    }
}

export interface ForgetPasswordRequest extends Request {
    body: {
        email: string;
    }
}