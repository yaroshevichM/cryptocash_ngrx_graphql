import { Action } from '@ngrx/store';
import { ICard, ICreateCard } from '../../models/Card';

export enum ECardActions {
  ALL_CARDS_REQUESTED = '[Card] All cards requested',
  ALL_CARDS_COMPLETED = '[Card] All cards completed',
  CREATE_CARD_REQUESTED = '[Card] Create card requested',
  CREATE_CARD_COMPLETED = '[Card] Create card completed',
  DELETE_CARD_REQUESTED = '[Card] Delete card requested',
  DELETE_CARD_COMPLETED = '[Card] Delete card completed',
  CURRENT_CARD_REQUESTED = '[Card] Current card requested',
  CURRENT_CARD_COMPLETED = '[Card] Curent card completed',
  CARDS_ERROR = '[Card] Cards error',
}

export class AllCardsRequestedAction implements Action {
  public readonly type = ECardActions.ALL_CARDS_REQUESTED;
  constructor(public payload: { userId: string }) {}
}

export class AllCardsCompletedAction implements Action {
  public readonly type = ECardActions.ALL_CARDS_COMPLETED;
  constructor(public payload: Array<ICard>) {}
}

export class CreateCardRequestedAction implements Action {
  public readonly type = ECardActions.CREATE_CARD_REQUESTED;
  constructor(public payload: ICreateCard) {}
}

export class CreateCardCompletedAction implements Action {
  public readonly type = ECardActions.CREATE_CARD_COMPLETED;
  constructor(public payload: ICard) {}
}

export class DeleteCardRequestedAction implements Action {
  public readonly type = ECardActions.DELETE_CARD_REQUESTED;
  constructor(public payload: { cardId: string }) {}
}

export class DeleteCardCompletedAction implements Action {
  public readonly type = ECardActions.DELETE_CARD_COMPLETED;
  constructor(public payload: string) {}
}

export class CurrentCardRequestedAction implements Action {
  public readonly type = ECardActions.CURRENT_CARD_REQUESTED;
  constructor(public payload: { cardId: string }) {}
}

export class CurrentCardCompletedAction implements Action {
  public readonly type = ECardActions.CURRENT_CARD_COMPLETED;
  constructor(public payload: ICard) {}
}

export type CardAction =
  | AllCardsCompletedAction
  | AllCardsRequestedAction
  | CreateCardRequestedAction
  | CreateCardCompletedAction
  | DeleteCardRequestedAction
  | DeleteCardCompletedAction
  | CurrentCardRequestedAction
  | CurrentCardCompletedAction;
