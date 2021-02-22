import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IUser } from 'src/app/models/User';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';
import { IAppState } from 'src/app/store/appState';
import { selectUserInner } from 'src/app/store/selectors/user.selector';
import { ICard } from '../../../../models/Card';
import { ITransaction } from '../../../../models/Transaction';
import { CurrentCardRequestedAction } from '../../../../store/actions/card.actions';
import { CardTransactionsRequestedAction } from '../../../../store/actions/transaction.actions';
import { selectCurrentCardInner } from '../../../../store/selectors/card.selector';
import { selectCardTransactionsInner } from '../../../../store/selectors/transactions.selector';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  
  private currentCardId: string;
  public currentCard;
  public currentCardTransactions;
  public userData;

  constructor(private _activeRoute: ActivatedRoute, private _store: Store<IAppState>, private _loaderService: LoaderService) { 
    this._activeRoute.params.subscribe((params) => {
      this.currentCardId = params.cardId
    })
  }

  ngOnInit(): void {
    this.dispatchActions()
  }

  private dispatchActions() {
    this._loaderService.isLoaderShow = true;
    this._store.dispatch(new CurrentCardRequestedAction({cardId: this.currentCardId}))
    this._store.dispatch(new CardTransactionsRequestedAction({cardId: this.currentCardId}))
    this.selectDataFromStore().subscribe(([currentCardData, cardTransactionsData, userData] : Array<ICard | ITransaction[] | IUser>) => {
      this.currentCard = currentCardData;
      this.currentCardTransactions = cardTransactionsData;
      this.userData = userData;
      this._loaderService.isLoaderShow = false;
    });
  }

  private selectDataFromStore() {
    const accountDetailsSelectors = [
      this._store.select(selectCurrentCardInner),
      this._store.select(selectCardTransactionsInner),
      this._store.select(selectUserInner)
    ]
    return combineLatest(accountDetailsSelectors).pipe(filter(el => !el.includes(null)))
  }

}
