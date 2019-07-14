import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListRoutingModule} from './list-routing.module';
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
} from '@angular/material';
import {DataComponent} from './data/data.component';

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
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatMenuModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ]
})
export class ListModule {
}
