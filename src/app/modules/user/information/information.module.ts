import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatBadgeModule,
  MatInputModule,
  MatMenuModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';
import { DialogModule } from '../../share/dialog/dialog.module';
import { AuthRolePipeModule } from '../../share/auth-role-pipe/auth-role-pipe.module';

@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    InformationRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatInputModule,
    MatMenuModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DialogModule.forRoot(),
    AuthRolePipeModule,
  ]
})
export class InformationModule { }
