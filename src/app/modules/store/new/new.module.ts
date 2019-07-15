import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewRoutingModule} from './new-routing.module';
import {PageComponent} from './page/page.component';
import {TemplateModule} from '../share/template/template.module';
import {DialogModule} from '../../share/dialog/dialog.module';

@NgModule({
  declarations: [
    PageComponent,
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    TemplateModule.forRoot(),
    DialogModule.forRoot(),
  ]
})
export class NewModule {
}
