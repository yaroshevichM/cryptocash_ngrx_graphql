import { Injectable } from '@angular/core';
import { ApiService } from '../../modules/core/services/api.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
   BalanceCompletedAction,
  BalanceRequstedAction,
  EBalanceActions,
} from '../actions/balance.actions';

@Injectable()
export class BalanceEffects {
  constructor(private _actions$: Actions, private _apiService: ApiService) {}

  @Effect()
  userBalance$: Observable<Action> = this._actions$.pipe(
    ofType<BalanceRequstedAction>(EBalanceActions.BALANCE_REQUESTED),
    map((action) => action.payload),
    switchMap((payload: any) => this._apiService.getUserBalance(payload.userId).pipe(
       map((userBalanceResponse: any) => {
          return new BalanceCompletedAction(userBalanceResponse.data.getUserBalance)
       })
    ))
  );
}
