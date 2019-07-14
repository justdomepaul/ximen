import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    EditRoutingModule
  ]
})
export class EditModule { }
