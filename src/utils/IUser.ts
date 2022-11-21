import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    mail: string;
    password: string;
    address: {
        street: string;
        location: string;
        city: string;
        country: string;
        cp: string;
    };
    birthday: Date;
    phone: string;
    state: boolean;
    role: string;
    date: Date;
}