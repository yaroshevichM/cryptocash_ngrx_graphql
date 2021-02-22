import { Action } from '@ngrx/store';
import { IExchangeRates } from '../states/exchange-rates.state';

export enum EExchangeRates {
  EXCHANGE_RATES_REQUESTED = '[Exchange-rates] Exchange rates requested',
  EXCHANGE_RATES_COMPLETED = '[Exchange-rates] Exchange rates completed',
  EXCHANGE_RATES_ERROR = '[Exchange-rates] Exchange rates error',
}

export class ExchangeRatesRequestedAction implements Action {
  public readonly type = EExchangeRates.EXCHANGE_RATES_REQUESTED;
  constructor() {}
}

export class ExchangeRatesCompletedAction implements Action {
  public readonly type = EExchangeRates.EXCHANGE_RATES_COMPLETED;
  constructor(public payload: Array<IExchangeRates>) {}
}

export type ExchangeRatesAction =
  | ExchangeRatesRequestedAction
  | ExchangeRatesCompletedAction;
