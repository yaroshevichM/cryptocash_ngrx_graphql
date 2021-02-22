import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../modules/core/services/api.service';

import {
  EServicesActions,
  serviceByIdCompletedAction,
  serviceByIdRequestedAction,
  servicesCompletedAction,
  servicesRequestedAction,
} from '../actions/services.action';

@Injectable()
export class ServicesEffects {
  constructor(private _actions$: Actions, private _apiService: ApiService) { }

  @Effect()
  getAllServices$: Observable<Action> = this._actions$.pipe(
    ofType<servicesRequestedAction>(EServicesActions.SERVICES_REQUESTED),
    switchMap(() => this._apiService.getAllServices().pipe(
      map((getAllServicesRes: any) => {
        return new servicesCompletedAction(getAllServicesRes.data.getAllServices);
      })
    )
    )
  );

  @Effect()
  getServicebyId$: Observable<Action> = this._actions$.pipe(ofType<serviceByIdRequestedAction>(EServicesActions.SERVICE_BY_ID_REQUSETED),
  switchMap((action) => this._apiService.getServiceById(action.payload).pipe(
    map((getServiceByIdRes: any) => {
      return new serviceByIdCompletedAction(getServiceByIdRes.data.getServiceById)
    })
  )))
}
