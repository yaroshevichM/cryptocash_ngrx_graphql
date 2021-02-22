import { ITransaction } from './Transaction';

export interface ICard {
  _id: string;
  name: string;
  cardNumber: String;
  currencyType: string;
  cardType: string;
  balance: number;
  expirationDate: string;
  cardHolder: String;
  transactions: ITransaction;
  creatonDate: String;
  earnings: number;
  spendings: number;
}

export interface ICreateCard {
  name: string;
  currencyType: string;
  cardType: string;
  cardHolderId: String;
}
