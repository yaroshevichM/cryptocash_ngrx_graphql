import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { NotificationComponent } from 'src/app/modules/shared/components/notification/notification.component';
import { IAppState } from 'src/app/store/appState';
import { CreateCardRequestedAction } from '../../../../store/actions/card.actions';
import { ExchangeRatesRequestedAction } from '../../../../store/actions/exchange-rates.action';
import { selectExchangeRatesInner } from '../../../../store/selectors/exchnage-rates.selector';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  public createCardForm: FormGroup;
  public currencyTypes;

  constructor(private _store: Store<IAppState>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initCreateCardForm();
    this.getCreateCardPageData();
  }

  private initCreateCardForm() {
    this.createCardForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cardType: new FormControl('', [Validators.required]),
      currencyType: new FormControl('', [Validators.required]),
      acceptPP: new FormControl('', [Validators.required]),
    })
  }

  public createCard() {
    if (this.createCardForm.valid) {
      const createCardFormValue = this.createCardForm.value;
      delete createCardFormValue.acceptPP
      const createCardData = { ...createCardFormValue, cardHolderId: window.sessionStorage.getItem('currentUserId') }
      this._store.dispatch(new CreateCardRequestedAction(createCardData));
    } else {
      this._snackBar.openFromComponent(NotificationComponent, {
        duration: 3500,
        horizontalPosition: 'right',
        data: { text: "Entered data is invalid", type: 'error' },
      });
    }
  }

  private getCreateCardPageData() {
    this._store.dispatch(new ExchangeRatesRequestedAction())
    this.selectDataFromStore().subscribe(createCardPageStoreRes => {
      this.currencyTypes = createCardPageStoreRes;
    })
  }

  private selectDataFromStore() {
    return this._store.pipe(select(selectExchangeRatesInner))
  }

}
