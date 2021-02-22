import { ITransaction } from "../../models/Transaction";

export interface ITransactionState {
   transactions: Array<ITransaction>,
   currentCardTransactions: Array<ITransaction>,
}

export const initialTransactionState = {
   transactions: null,
   currentCardTransactions: null,
}