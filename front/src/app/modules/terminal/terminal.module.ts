import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TerminalComponent } from './components/terminal/terminal.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { ServicesEffects } from '../../store/effects/services.effects';
import { TransactionEffects } from '../../store/effects/transaction.effects';
import { CardEffects } from '../../store/effects/card.effects';

const terminalRoutes: Routes = [
  {
    path: '',
    component: TerminalComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    TerminalComponent,
  ],
  imports: [
    RouterModule.forChild(terminalRoutes),
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([
      ServicesEffects,
      TransactionEffects,
      CardEffects,
    ]),
  ],
})
export class TerminalModule { }
