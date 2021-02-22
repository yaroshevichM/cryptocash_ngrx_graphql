import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/appState';
import { BalanceRequstedAction } from '../../../../store/actions/balance.actions';
import { servicesRequestedAction } from '../../../../store/actions/services.action';
import { ExchangeRatesRequestedAction } from '../../../../store/actions/exchange-rates.action';
import { AllTransactionsRequestedAction } from '../../../../store/actions/transaction.actions';
import { selectUserBalanceInner } from "../../../../store/selectors/balance.selector";
import { selectExchangeRatesInner } from "../../../../store/selectors/exchnage-rates.selector";
import { selectServicesInner } from "../../../../store/selectors/services.selector";
import { selectTransactionsInner } from "../../../../store/selectors/transactions.selector";
import { selectUserInner } from "../../../../store/selectors/user.selector";
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private _store: Store<IAppState>, private _router: Router, private loaderService: LoaderService) { }

  public userBalanceData;
  public exchangeRatesData;
  public servicesData;
  public transactionsData;
  public userData;


  ngOnInit() {
    this.dispatchActions();
  }

  private dispatchActions() {
    this.loaderService.isLoaderShow = true;
    this._store.dispatch(new servicesRequestedAction());
    this._store.dispatch(new BalanceRequstedAction({ userId: window.sessionStorage.getItem('currentUserId') }));
    this._store.dispatch(new ExchangeRatesRequestedAction());
    this._store.dispatch(new AllTransactionsRequestedAction());

    this.selectDataFromStore().subscribe(([selectUserBalanceInner, selectExchangeRatesInner, selectServicesInner, selectTransactionsInner, selectUserInner]) => {
      this.userBalanceData = selectUserBalanceInner
      this.exchangeRatesData = selectExchangeRatesInner
      this.servicesData = selectServicesInner
      this.transactionsData = selectTransactionsInner
      this.userData = selectUserInner
      this.loaderService.isLoaderShow = false;
    })
  }

  private selectDataFromStore() {
    const dashboardSelectors = [
      this._store.pipe(select(selectUserBalanceInner)),
      this._store.pipe(select(selectExchangeRatesInner)),
      this._store.pipe(select(selectServicesInner)),
      this._store.pipe(select(selectTransactionsInner)),
      this._store.pipe(select(selectUserInner))
    ];
    return combineLatest(dashboardSelectors).pipe(filter(el => !el.includes(null)))
  }

  public loadTerminal(service) {
    this._router.navigate([`/layout/terminal/${service._id}`])
  }

}
