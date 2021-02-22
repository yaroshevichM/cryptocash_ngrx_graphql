import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { SharedModule } from '../shared/shared.module';
import { ExchangeRatesEffects } from '../../store/effects/exchange-rates.effects';
import { CardEffects } from '../../store/effects/card.effects';
import { EffectsModule } from '@ngrx/effects';

const createCardRoutes: Routes = [
  {
    path: '',
    component: CreateCardComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    CreateCardComponent,
  ],
  imports: [
    RouterModule.forChild(createCardRoutes),
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([
      ExchangeRatesEffects,
      CardEffects,
    ]),
  ],
})
export class CreateCardModule { }
