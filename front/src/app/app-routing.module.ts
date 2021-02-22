import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { UserResolver } from "./resolvers/user.resolver";


const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {path: 'layout', loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard], resolve: {UserResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
