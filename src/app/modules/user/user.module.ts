import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserSigninComponent } from './user-signin/user-signin.component';
import {
  MatToolbarModule,
  MatSidenavModule
} from '@angular/material';

@NgModule({
  declarations: [UserSigninComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class UserModule { }
