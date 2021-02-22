import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const authRoutes: Routes = [
  {path: '', redirectTo: 'login'}, 
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
]

@NgModule({
  exports: [RouterModule],
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    SharedModule,
  ]
})
export class AuthModule { }
