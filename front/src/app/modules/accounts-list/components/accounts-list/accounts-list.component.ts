import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';
import { IAppState } from 'src/app/store/appState';
import { selectUserInner } from 'src/app/store/selectors/user.selector';
import { IUserState } from 'src/app/store/states/user.state';
import { ICard } from '../../../../models/Card';
import { AllCardsRequestedAction, DeleteCardRequestedAction } from '../../../../store/actions/card.actions';
import { selectAllCardsInner } from "../../../../store/selectors/card.selector";


@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  public allCards;
  public userData;

  constructor(private _store: Store<IAppState>, private _router: Router, private _loaderService: LoaderService) { }

  ngOnInit(): void {
    this.dispatchActions()
  }

  public deleteCard(cardId: string) {
    this._store.dispatch(new DeleteCardRequestedAction({cardId: cardId}))
  }

  public openCardDetails(cardId: string) {
    this._router.navigate([`layout/accounts/${cardId}`])
  }

  private dispatchActions() {
    this._loaderService.isLoaderShow = true;
    this._store.dispatch(new AllCardsRequestedAction({userId: window.sessionStorage.getItem('currentUserId')}))
    this.selectDataFromStore().subscribe(([allCardsData, userData]) => {
      this.allCards = allCardsData;
      this.userData = userData;
      this._loaderService.isLoaderShow = false;
    })
  }

  private selectDataFromStore() {
    const accountsListSelectors = [
      this._store.select(selectAllCardsInner),
      this._store.select(selectUserInner)
    ]
    return combineLatest(accountsListSelectors).pipe(filter(e => !e.includes(null)))
  }

}
