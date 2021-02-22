import { initialTransactionState } from '../states/transaction.state';
import {
  ETransactionActions,
  TransactionAction,
} from '../actions/transaction.actions';

export const transactionReducer = (
  state = initialTransactionState,
  action: TransactionAction
) => {
  switch (action.type) {
    case ETransactionActions.ALL_TRANSACTIONS_COMPLETED:
      return { ...state, transactions: action.payload };
    case ETransactionActions.CARD_TRANSACTIONS_COMPLETED:
      return { ...state, currentCardTransactions: action.payload };
    default:
      return { ...state };
  }
};
