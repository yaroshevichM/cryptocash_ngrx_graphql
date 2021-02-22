import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    ProfileComponent,
  ],
  imports: [
    RouterModule.forChild(profileRoutes),
    CommonModule,
    SharedModule,
  ],
})
export class ProfileModule { }
