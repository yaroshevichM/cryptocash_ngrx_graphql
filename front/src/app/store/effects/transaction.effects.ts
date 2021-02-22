import { Injectable } from '@angular/core';
import { ApiService } from '../../modules/core/services/api.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  AllTransactionsCompletedAction,
  AllTransactionsRequestedAction,
  CardTransactionsCompletedAction,
  CardTransactionsRequestedAction,
  CreateTransactionCompletedAction,
  CreateTransactionRequestedAction,
  ETransactionActions,
} from '../actions/transaction.actions';
import { NotificationComponent } from '../../modules/shared/components/notification/notification.component';
import { Location } from '@angular/common'; import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TransactionEffects {
  constructor(private _actions$: Actions, private _apiService: ApiService, private _location: Location, private _snackBar: MatSnackBar) { }

  @Effect()
  allTransactions$: Observable<Action> = this._actions$.pipe(
    ofType<AllTransactionsRequestedAction>(
      ETransactionActions.ALL_TRANSACTIONS_REQUESTED
    ),
    switchMap(() =>
      this._apiService.getAllTransactions(window.sessionStorage.getItem("currentUserId")).pipe(
        map((allTransactionsResponse: any) => {
          return new AllTransactionsCompletedAction(
            allTransactionsResponse.data.getAllTransactions
          );
        })
      )
    )
  );

  @Effect()
  cardTransactions$: Observable<Action> = this._actions$.pipe(
    ofType<CardTransactionsRequestedAction>(
      ETransactionActions.CARD_TRANSACTIONS_REQUESTED
    ),
    switchMap((action) =>
      this._apiService.getCardTransactions(action.payload.cardId).pipe(
        map((cardTransactionsResponse: any) => {
          return new CardTransactionsCompletedAction(
            cardTransactionsResponse.data.getCardTransactions
          );
        })
      )
    )
  );

  @Effect()
  createTransactions$: Observable<Action> = this._actions$.pipe(
    ofType<CreateTransactionRequestedAction>(
      ETransactionActions.CREATE_TRANSACTION_REQUESTED
    ),
    switchMap((action) =>
      this._apiService.createTransaction(action.payload).pipe(
        map((createTransactionResponse: any) => {
          return new CreateTransactionCompletedAction(
            createTransactionResponse.data.createTransaction
          );
        }),
        tap(() => {
          this._snackBar.openFromComponent(NotificationComponent, {
            duration: 2500,
            horizontalPosition: 'right',
            data: { text: 'Transaction successfully completed', type: 'success' },
          });
          this._location.back();
        })
      )
    )
  );
}
