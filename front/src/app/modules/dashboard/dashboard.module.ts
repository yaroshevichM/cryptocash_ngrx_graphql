import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { ServicesEffects } from '../../store/effects/services.effects';
import { BalanceEffects } from '../../store/effects/balance.effects';
import { ExchangeRatesEffects } from '../../store/effects/exchange-rates.effects';
import { TransactionEffects } from '../../store/effects/transaction.effects';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    DashboardComponent,
  ],
  imports: [
    RouterModule.forChild(dashboardRoutes),
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([
      ServicesEffects,
      BalanceEffects,
      ExchangeRatesEffects,
      TransactionEffects,
    ]),
  ],
})
export class DashboardModule { }
