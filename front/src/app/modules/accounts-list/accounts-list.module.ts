import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { CardEffects } from '../../store/effects/card.effects';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

const accounListRoutes: Routes = [
  {
    path: '',
    component: AccountsListComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    AccountsListComponent,
  ],
  imports: [
    RouterModule.forChild(accounListRoutes),
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([
      CardEffects,
    ]),
  ],
})
export class AccountsListModule { }
