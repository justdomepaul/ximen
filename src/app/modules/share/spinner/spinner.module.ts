import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullSpinnerComponent} from './full-spinner/full-spinner.component';
import {FullSpinnerService} from '../../../core/services/full-spinner.service';
import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    FullSpinnerComponent
  ],
  declarations: [
    FullSpinnerComponent
  ],
  providers: [
    FullSpinnerService
  ],
  entryComponents: [
    FullSpinnerComponent
  ]
})
export class SpinnerModule {
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: SpinnerModule,
      providers: [...providers, FullSpinnerService]
    };
  }
}
