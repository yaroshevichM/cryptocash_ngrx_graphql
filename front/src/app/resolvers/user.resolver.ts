import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../store/appState';
import { selectUserInner } from '../store/selectors/user.selector';
import { UserDataRequestedAction } from '../store/actions/user.action';

@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(
    private _store: Store<IAppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this._store.pipe(select(selectUserInner)).subscribe((userData: any) => {
         if (!userData._id) {
            this._store.dispatch(new UserDataRequestedAction({userId: window.sessionStorage.getItem('currentUserId')}))
            return true
         }
      });
  }
}
