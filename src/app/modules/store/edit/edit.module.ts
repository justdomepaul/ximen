import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditRoutingModule} from './edit-routing.module';
import {PageComponent} from './page/page.component';
import {TemplateModule} from '../share/template/template.module';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    PageComponent,
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    MatSnackBarModule,
    TemplateModule.forRoot(),
  ]
})
export class EditModule {
}
