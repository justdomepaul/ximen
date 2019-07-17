import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRolePipe } from 'src/app/core/pipes/auth-role.pipe';

@NgModule({
  declarations: [
    AuthRolePipe,
  ],
  exports: [
    AuthRolePipe,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthRolePipeModule { }
