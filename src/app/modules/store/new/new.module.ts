import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    NewRoutingModule
  ]
})
export class NewModule { }
