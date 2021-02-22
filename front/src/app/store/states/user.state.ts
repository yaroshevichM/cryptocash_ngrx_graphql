import { IUser } from "../../models/User";

export interface IUserState extends IUser {
   token: string
   expirationDate: string
}

export const initialUserState = {
   _id: null,
   firstName: null,
   lastName: null,
   email: null,
   accountType: null,
   creationDate: null,
   birthDate: null,
   phonenumber: null,
   token: null,
   expirationDate: null
}