import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { ServicesEffects } from '../../store/effects/services.effects';
import { BalanceEffects } from '../../store/effects/balance.effects';
import { TransactionEffects } from '../../store/effects/transaction.effects';
import { ExchangeRatesEffects } from '../../store/effects/exchange-rates.effects';
import { CardEffects } from '../../store/effects/card.effects';

const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'accounts', loadChildren: () => import('../../modules/accounts-list/accounts-list.module').then(m => m.AccountsListModule) },
      { path: 'accounts/:cardId', loadChildren: () => import('../../modules/account-details/account-details.module').then(m => m.AccountDetailsModule) },
      { path: 'create-account', loadChildren: () => import('../../modules/create-card/create-card.module').then(m => m.CreateCardModule) },
      { path: 'profile', loadChildren: () => import('../../modules/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'services', loadChildren: () => import('../../modules/services/services.module').then(m => m.ServicesModule) },
      { path: 'terminal/:id', loadChildren: () => import('../../modules/terminal/terminal.module').then(m => m.TerminalModule) },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    LayoutComponent,
  ],
  imports: [
    RouterModule.forChild(layoutRoutes),
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([
      ServicesEffects,
      BalanceEffects,
      ExchangeRatesEffects,
      TransactionEffects,
      CardEffects,
    ]),
  ],
})
export class LayoutModule { }
