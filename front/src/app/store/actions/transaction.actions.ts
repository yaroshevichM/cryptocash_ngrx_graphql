import { Action } from '@ngrx/store';
import { ITransaction, ITransactionReq } from '../../models/Transaction';

export enum ETransactionActions {
  ALL_TRANSACTIONS_REQUESTED = '[Transaction] All transactions requested',
  ALL_TRANSACTIONS_COMPLETED = '[Transaction] All transactions completed',
  CARD_TRANSACTIONS_REQUESTED = '[Transaction] Card transactions requested',
  CARD_TRANSACTIONS_COMPLETED = '[Transaction] Card transactions completed',
  CREATE_TRANSACTION_REQUESTED = '[Transaction] Create transaction requested',
  CREATE_TRANSACTION_COMPLETED = '[Transaction] Create transaction completed',
  TRANSACTIONS_ERROR = '[Transaction] transactions error',
}

export class AllTransactionsRequestedAction implements Action {
  public readonly type = ETransactionActions.ALL_TRANSACTIONS_REQUESTED;
  constructor() { }
}

export class AllTransactionsCompletedAction implements Action {
  public readonly type = ETransactionActions.ALL_TRANSACTIONS_COMPLETED;
  constructor(public payload: Array<ITransaction>) { }
}

export class CardTransactionsRequestedAction implements Action {
  public readonly type = ETransactionActions.CARD_TRANSACTIONS_REQUESTED;
  constructor(public payload: { cardId: string }) { }
}

export class CardTransactionsCompletedAction implements Action {
  public readonly type = ETransactionActions.CARD_TRANSACTIONS_COMPLETED;
  constructor(public payload: Array<ITransaction>) { }
}


export class CreateTransactionRequestedAction implements Action {
  public readonly type = ETransactionActions.CREATE_TRANSACTION_REQUESTED;
  constructor(public payload: ITransactionReq) { }
}

export class CreateTransactionCompletedAction implements Action {
  public readonly type = ETransactionActions.CREATE_TRANSACTION_COMPLETED;
  constructor(public payload: Array<ITransaction>) { }
}


export type TransactionAction =
  | AllTransactionsRequestedAction
  | AllTransactionsCompletedAction
  | CardTransactionsRequestedAction
  | CardTransactionsCompletedAction | CreateTransactionRequestedAction | CreateTransactionCompletedAction;
