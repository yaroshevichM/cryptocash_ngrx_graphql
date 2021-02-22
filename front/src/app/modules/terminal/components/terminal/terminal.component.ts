import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICard } from 'src/app/models/Card';
import { NotificationComponent } from 'src/app/modules/shared/components/notification/notification.component';
import { IAppState } from 'src/app/store/appState';
import { selectAllCardsInner } from 'src/app/store/selectors/card.selector';
import { selectCurrentService } from 'src/app/store/selectors/services.selector';
import { serviceByIdRequestedAction } from 'src/app/store/actions/services.action';
import { AllCardsRequestedAction } from 'src/app/store/actions/card.actions';
import { CreateTransactionRequestedAction } from 'src/app/store/actions/transaction.actions';


@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  private userCards$ = this._store.select(selectAllCardsInner).subscribe(userCards => {
    this.userCards = userCards
  })
  public paymentForm: FormGroup;
  public currentService$;
  private transactionType: string;
  public userCards: ICard[];
  private currency: any;

  constructor(private _store: Store<IAppState>, private _activeRoute: ActivatedRoute, private _snackBar: MatSnackBar) {
    this._activeRoute.params.subscribe((params: Params) => {
      this._store.dispatch(new serviceByIdRequestedAction(params.id))
    })
  }

  ngOnInit(): void {
    this._store.dispatch(new AllCardsRequestedAction({ userId: window.sessionStorage.getItem('currentUserId') }))
    this.initPaymentForm();
    this.currentService$ = this._store.select(selectCurrentService).subscribe((currentServiceData) => {
      if (currentServiceData) {
        this.paymentForm.patchValue({
          receiverCardNumber: currentServiceData.cardNumber
        })
        this.transactionType = currentServiceData.name
      }
    })
  }

  private initPaymentForm() {
    this.paymentForm = new FormGroup({
      receiverCardNumber: new FormControl('', Validators.required),
      transactionAmount: new FormControl('', Validators.required),
      senderCardId: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  public createTransaction() {

    if(!this.handleForm(this.paymentForm)) {
      return false
    }

    const transactionRequestValue = this.paymentForm.value;
    transactionRequestValue.type = this.transactionType;
    transactionRequestValue.currency = this.currency;
    transactionRequestValue.transactionAmount = +transactionRequestValue.transactionAmount;
    this._store.dispatch(new CreateTransactionRequestedAction(transactionRequestValue))
  }

  private handleForm(form) {
    if (!form.valid) {
      this._snackBar.openFromComponent(NotificationComponent, {
        duration: 2500,
        horizontalPosition: 'right',
        data: { text: 'Input data are invalid', type: 'error' },
      });
      return false
    }
    return true
  }

  public selectCard(event) {
    this.currency = this.userCards.filter(card => card._id === event.value)[0].currencyType
  }

}
