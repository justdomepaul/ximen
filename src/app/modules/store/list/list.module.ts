import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListRoutingModule} from './list-routing.module';
import {
  MatTableModule,
  MatCheckboxModule,
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
import {DataComponent} from './data/data.component';
import { DialogModule } from '../../share/dialog/dialog.module';

@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatMenuModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DialogModule.forRoot(),
  ]
})
export class ListModule {
}
