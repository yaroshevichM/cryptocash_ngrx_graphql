export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  creationDate: string;
  birthDate: string;
  phonenumber: string;
}

export interface IUserAuth {
  userId: string;
  token: string;
  expirationDate: string;
}

export interface IUserUpdate {
  email: string;
  accountType: string;
  phonenumber: string;
}

export interface IUserRegistrationPayload {
  firstName: string;
  lastName: string;
  birthDate: string;
  phonenumber: string;
  password: string;
  email: string;
}
