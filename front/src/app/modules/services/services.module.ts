import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { ServicesEffects } from '../../store/effects/services.effects';

const servicesRoutes: Routes = [
  {
    path: '',
    component: ServicesComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    ServicesComponent,
  ],
  imports: [
    RouterModule.forChild(servicesRoutes),
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([
      ServicesEffects,
    ]),
  ],
})
export class ServicesModule { }
