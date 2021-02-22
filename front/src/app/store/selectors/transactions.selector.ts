import { IAppState } from "../appState";
import {createSelector} from "@ngrx/store"
import { ITransactionState } from "../states/transaction.state";

const selectTransactions = (state: IAppState) => state.transactions;

export const selectTransactionsInner = createSelector(
   selectTransactions,
   (state: ITransactionState) => state.transactions
);

export const selectCardTransactionsInner = createSelector(
   selectTransactions,
   (state: ITransactionState) => state.currentCardTransactions
);