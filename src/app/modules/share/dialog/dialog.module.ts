import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert/alert.component';
import {AlertService} from '../../../core/services/alert.service';
import {MatDialogModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    AlertComponent
  ],
  exports: [
    AlertComponent
  ],
  providers: [
    AlertService
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class DialogModule {
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [...providers, AlertService]
    };
  }
}
