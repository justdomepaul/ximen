import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewRoutingModule} from './new-routing.module';
import {PageComponent} from './page/page.component';
import {TemplateModule} from '../share/template/template.module';
import {DialogModule} from '../../share/dialog/dialog.module';
import { MatSnackBarModule } from '@angular/material';
import { SpinnerModule } from '../../share/spinner/spinner.module';

@NgModule({
  declarations: [
    PageComponent,
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    MatSnackBarModule,
    TemplateModule.forRoot(),
  ]
})
export class NewModule {
}
