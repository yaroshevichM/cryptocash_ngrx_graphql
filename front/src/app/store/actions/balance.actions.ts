import { Action } from '@ngrx/store';
import { IGeneralBalance } from '../states/balance.state';

export enum EBalanceActions {
  BALANCE_REQUESTED = '[BALANCE] Balance requested',
  BALANCE_COMPLETED = '[BALANCE] Balance completed',
  BALANCE_ERROR = '[BALANCE] Balance error',
}

export class BalanceRequstedAction implements Action {
  public readonly type = EBalanceActions.BALANCE_REQUESTED;
  constructor(public payload: { userId: string }) {}
}

export class BalanceCompletedAction implements Action {
  public readonly type = EBalanceActions.BALANCE_COMPLETED;
  constructor(public payload: IGeneralBalance) {}
}

export type BalanceActions = BalanceRequstedAction | BalanceCompletedAction;
