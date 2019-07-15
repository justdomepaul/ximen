import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateComponent} from './create/create.component';
import {StoreService} from '../../../../core/services/store.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatIconModule,
} from '@angular/material';
@NgModule({
  exports: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
  ],
  declarations: [
    CreateComponent
  ],
  providers: [StoreService],
  entryComponents: [CreateComponent]
})
export class TemplateModule {
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: TemplateModule,
      providers: [...providers, StoreService]
    };
  }
}
