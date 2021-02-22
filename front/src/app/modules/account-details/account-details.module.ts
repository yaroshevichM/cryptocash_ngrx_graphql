import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TransactionEffects } from '../../store/effects/transaction.effects';
import { CardEffects } from '../../store/effects/card.effects';

const accounDetailsRoutes: Routes = [
  {
    path: '',
    component: AccountDetailsComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    AccountDetailsComponent,
  ],
  imports: [
    RouterModule.forChild(accounDetailsRoutes),
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([
      TransactionEffects,
      CardEffects,
    ]),
  ],
})
export class AccountDetailsModule { }
