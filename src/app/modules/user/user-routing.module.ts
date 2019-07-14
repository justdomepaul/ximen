import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserSigninComponent} from './user-signin/user-signin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: UserSigninComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
