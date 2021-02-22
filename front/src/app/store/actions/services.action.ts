import { Action } from '@ngrx/store';
import { IService } from "../../models/Service";

export enum EServicesActions {
   SERVICES_REQUESTED = '[Services] Services requested',
   SERVICES_COMPLETED = '[Services] Services completed',
   SERVICE_BY_ID_REQUSETED = '[Services] Service by id requested',
   SERVICE_BY_ID_COMPLETED = '[Services] Service by id completed',
   SERVICES_ERROR = '[Services] Services error'
}

export class servicesRequestedAction implements Action {
   public readonly type = EServicesActions.SERVICES_REQUESTED
   constructor() { }
}


export class servicesCompletedAction implements Action {
   public readonly type = EServicesActions.SERVICES_COMPLETED
   constructor(public payload: [IService]) { }
}

export class serviceByIdRequestedAction implements Action {
   public readonly type = EServicesActions.SERVICE_BY_ID_REQUSETED
   constructor(public payload: string) { }
}


export class serviceByIdCompletedAction implements Action {
   public readonly type = EServicesActions.SERVICE_BY_ID_COMPLETED
   constructor(public payload: IService) { }
}

export type servicesActions = servicesRequestedAction | servicesCompletedAction | serviceByIdRequestedAction | serviceByIdCompletedAction;