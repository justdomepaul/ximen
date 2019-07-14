import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserSigninComponent} from './user-signin/user-signin.component';
import {AuthLoginedGuard} from '../../core/guards/auth-logined.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: UserSigninComponent,
    canActivate: [
      AuthLoginedGuard
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
