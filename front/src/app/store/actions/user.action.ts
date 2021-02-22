import { Action } from '@ngrx/store';
import { IUser, IUserAuth, IUserRegistrationPayload, IUserUpdate } from '../../models/User';

export enum EUserActions {
  USER_DATA_REQUESTED = '[User] User requested',
  USER_DATA_COMPLETED = '[User] User requested complete',

  USER_REGISTRATION_REQUESTED = '[User] Registration requested',
  USER_REGISTRATION_COMPLETED = '[User] Registration completed',

  USER_LOGIN_REQUESTED = '[User] Login requested',
  USER_LOGIN_COMPLETED = '[User] Login completed',

  USER_LOGOUT_REQUESTED = '[User] Login requested',
  USER_LOGOUT_COMPLETED = '[User] Login completed',

  USER_UPDATE_REQUESTED = '[User] Update requested',
  USER_UPDATE_COMPLETED = '[User] Update completed',

  USER_ERROR = '[User] User error returned',
}

export class UserDataRequestedAction implements Action {
  public readonly type = EUserActions.USER_DATA_REQUESTED;
  constructor(public payload: { userId: string }) { }
}

export class UserDataCompletedAction implements Action {
  public readonly type = EUserActions.USER_DATA_COMPLETED;
  constructor(public payload: IUser) { }
}

export class UserDataErrorAction implements Action {
  public readonly type = EUserActions.USER_ERROR;
  constructor(public payload: IUserRegistrationPayload) { }
}

export class UserLoginRequestedAction implements Action {
  public readonly type = EUserActions.USER_LOGIN_REQUESTED;
  constructor(public payload: { email: string; password: string }) { }
}

export class UserLoginCompletedAction implements Action {
  public readonly type = EUserActions.USER_LOGIN_COMPLETED;
  constructor(public payload: IUserAuth) { }
}

export class UserRegistrationRequestedAction implements Action {
  public readonly type = EUserActions.USER_REGISTRATION_REQUESTED;
  constructor(public payload: IUserRegistrationPayload) { }
}

export class UserRegistrationCompletedAction implements Action {
  public readonly type = EUserActions.USER_REGISTRATION_COMPLETED;
  constructor() { }
}

export class UserLogoutRequestedAction implements Action {
  public readonly type = EUserActions.USER_LOGOUT_REQUESTED;
}

export class UserLogoutCompletedAction implements Action {
  public readonly type = EUserActions.USER_LOGOUT_COMPLETED;
  constructor(public payload: IUserAuth) { }
}

export class UserAuthErrorAction implements Action {
  public readonly type = EUserActions.USER_ERROR;
}

export class UserUpdateRequestedAction implements Action {
  public readonly type = EUserActions.USER_UPDATE_REQUESTED;
  constructor(public payload: IUserUpdate) { }
}

export class UserUpdateCompletedAction implements Action {
  public readonly type = EUserActions.USER_UPDATE_COMPLETED;
  constructor(public payload: IUser) { }
}

export type UserAction =
  | UserDataRequestedAction
  | UserDataCompletedAction
  | UserLoginRequestedAction
  | UserLoginCompletedAction
  | UserRegistrationRequestedAction
  | UserRegistrationCompletedAction
  | UserLogoutRequestedAction
  | UserLogoutCompletedAction
  | UserAuthErrorAction
  | UserDataErrorAction | UserUpdateRequestedAction | UserUpdateCompletedAction
