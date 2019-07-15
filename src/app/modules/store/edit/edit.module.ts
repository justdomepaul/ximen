import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditRoutingModule} from './edit-routing.module';
import {PageComponent} from './page/page.component';
import {TemplateModule} from '../share/template/template.module';
import {DialogModule} from '../../share/dialog/dialog.module';

@NgModule({
  declarations: [
    PageComponent,
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    TemplateModule.forRoot(),
    DialogModule.forRoot(),
  ]
})
export class EditModule {
}
