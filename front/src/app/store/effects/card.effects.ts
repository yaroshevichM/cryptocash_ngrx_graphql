import { Injectable } from '@angular/core';
import { ApiService } from '../../modules/core/services/api.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  AllCardsCompletedAction,
  AllCardsRequestedAction,
  CreateCardCompletedAction,
  CreateCardRequestedAction,
  CurrentCardCompletedAction,
  CurrentCardRequestedAction,
  DeleteCardCompletedAction,
  DeleteCardRequestedAction,
  ECardActions,
} from '../actions/card.actions';
import { NotificationComponent } from 'src/app/modules/shared/components/notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAppState } from 'src/app/store/appState';

@Injectable()
export class CardEffects {
  constructor(
    private _actions$: Actions,
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _store: Store<IAppState>
  ) {}

  @Effect()
  allCards$: Observable<Action> = this._actions$.pipe(
    ofType<AllCardsRequestedAction>(ECardActions.ALL_CARDS_REQUESTED),
    map((action) => action.payload),
    switchMap((payload: any) =>
      this._apiService.getAllCards(payload.userId).pipe(
        map((allCardsResponse: any) => {
          return new AllCardsCompletedAction(allCardsResponse.data.userCards);
        })
      )
    )
  );

  @Effect()
  createCard$: Observable<Action> = this._actions$.pipe(
    ofType<CreateCardRequestedAction>(ECardActions.CREATE_CARD_REQUESTED),
    map((action) => action.payload),
    switchMap((payload) =>
      this._apiService.createNewCard(payload).pipe(
        map((createCardResponse: any) => {
          return new CreateCardCompletedAction(
            createCardResponse.data.createCard
          );
        }),
        tap(() => {
          this._snackBar.openFromComponent(NotificationComponent, {
            duration: 2500,
            horizontalPosition: 'right',
            data: { text: 'Card successfully created', type: 'success' },
          });
          this._router.navigate(['layout/accounts']);
        })
      )
    )
  );

  @Effect()
  deleteCard$: Observable<Action> = this._actions$.pipe(
    ofType<DeleteCardRequestedAction>(ECardActions.DELETE_CARD_REQUESTED),
    map((action) => action.payload),
    switchMap((payload) =>
      this._apiService.deleteCard(payload.cardId).pipe(
        map(() => {
          return new DeleteCardCompletedAction(payload.cardId);
        }),
        tap(() => {
          this._snackBar.openFromComponent(NotificationComponent, {
            duration: 1000,
            horizontalPosition: 'right',
            data: { text: 'Card successfully deleted', type: 'success' },
          });
        })
      )
    )
  );

  @Effect()
  currentCard$: Observable<Action> = this._actions$.pipe(
    ofType<CurrentCardRequestedAction>(ECardActions.CURRENT_CARD_REQUESTED),
    map((action) => action.payload),
    switchMap((payload) =>
      this._apiService.currentCard(payload.cardId).pipe(
        map((currentCardResponse: any) => {
          return new CurrentCardCompletedAction(currentCardResponse.data.cardById);
        }),
      )
    )
  );
}
