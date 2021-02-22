import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { ApiService } from '../../modules/core/services/api.service';
import {
  EUserActions,
  UserDataCompletedAction,
  UserDataRequestedAction,
  UserLoginCompletedAction,
  UserLoginRequestedAction,
  UserRegistrationCompletedAction,
  UserRegistrationRequestedAction,
  UserUpdateCompletedAction,
  UserUpdateRequestedAction,
} from '../actions/user.action';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IAppState } from '../appState';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/modules/shared/components/notification/notification.component';

@Injectable()
export class UserEffects {
  @Effect()
  userData$: Observable<Action> = this._actions$.pipe(
    ofType<UserDataRequestedAction>(EUserActions.USER_DATA_REQUESTED),
    map((action) => action.payload),
    switchMap((payload: any) =>
      this._apiService.getUserData(payload.userId).pipe(
        map((response: any) => {
          return new UserDataCompletedAction(response.data.user);
        })
      )
    )
  );

  @Effect()
  loginUser$: Observable<Action> = this._actions$.pipe(
    ofType<UserLoginRequestedAction>(EUserActions.USER_LOGIN_REQUESTED),
    map((action) => action.payload),
    switchMap((payload) =>
      this._authService.loginUser(payload.email, payload.password).pipe(
        map((response: any) => {
          try {
            window.sessionStorage.setItem(
              'currentUserId',
              response.data.login.userId
            );
            window.sessionStorage.setItem(
              'currentUserToken',
              response.data.login.token
            );
            this._store.dispatch(
              new UserDataRequestedAction({ userId: response.data.login.userId })
            );
            return new UserLoginCompletedAction(response.data.login);
          } catch (error) {
            throw new Error(error);
          }
        }),
        tap(() => {
          this._router.navigate(['/layout/dashboard']);
        }),
        catchError((e: any) => {
          this._snackBar.openFromComponent(NotificationComponent, {
            duration: 3500,
            horizontalPosition: 'right',
            data: { text: e.toString().slice(6), type: 'error' },
          });
          return throwError(e);
        })
      )
    )
  );

  @Effect()
  registerUser$: Observable<Action> = this._actions$.pipe(
    ofType<UserRegistrationRequestedAction>(
      EUserActions.USER_REGISTRATION_REQUESTED
    ),
    map((action) => action.payload),
    switchMap((payload: any) =>
      this._authService.registerUser(payload).pipe(
        map((response: any) => {
          this._snackBar.openFromComponent(NotificationComponent, {
            duration: 3500,
            horizontalPosition: 'right',
            data: { text: response.data.createUser.message, type: 'success' },
          });
          return new UserRegistrationCompletedAction();
        }),
        tap(() => this._router.navigate(['/login']))
      )
    )
  );

  @Effect()
  updateUser$: Observable<Action> = this._actions$.pipe(
    ofType<UserUpdateRequestedAction>(
      EUserActions.USER_UPDATE_REQUESTED
    ),
    map((action) => action.payload),
    switchMap((payload: any) =>
      this._apiService.updateUser(payload).pipe(
        map((response: any) => {
          this._snackBar.openFromComponent(NotificationComponent, {
            duration: 3500,
            horizontalPosition: 'right',
            data: { text: "User successfully updated", type: 'success' },
          });
          return new UserUpdateCompletedAction(response.data.changeUser);
        }))
    )
  );

  constructor(
    private _apiService: ApiService,
    private _actions$: Actions,
    private _router: Router,
    private _authService: AuthService,
    private _store: Store<IAppState>,
    private _snackBar: MatSnackBar
  ) { }
}
