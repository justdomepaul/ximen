import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class StoreModule { }
