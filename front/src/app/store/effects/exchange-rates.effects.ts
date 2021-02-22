import { Injectable } from '@angular/core';
import { ApiService } from '../../modules/core/services/api.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  EExchangeRates,
  ExchangeRatesRequestedAction,
  ExchangeRatesCompletedAction,
} from '../actions/exchange-rates.action';

@Injectable()
export class ExchangeRatesEffects {
  constructor(private _actions$: Actions, private _apiService: ApiService) {}

  @Effect()
  exchangeRates$: Observable<Action> = this._actions$.pipe(
    ofType<ExchangeRatesRequestedAction>(EExchangeRates.EXCHANGE_RATES_REQUESTED),
    switchMap(() =>
      this._apiService.getExchangeRates().pipe(
        map((exchangeRatesResponse: any) => {
          return new ExchangeRatesCompletedAction(exchangeRatesResponse.data.exchangeRates);
        })
      )
    )
  );
}
