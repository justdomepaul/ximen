import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatIconModule,
  MatSnackBarModule,
  MatRadioModule,
  MatSlideToggleModule
} from '@angular/material';
import { DialogModule } from 'src/app/modules/share/dialog/dialog.module';
import { AuthService } from 'src/app/core/services/auth.service';

@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    DialogModule.forRoot(),
  ],
  exports: [
    CreateComponent
  ],
  providers: [AuthService],
  entryComponents: [CreateComponent]
})
export class TemplateModule {
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: TemplateModule,
      providers: [...providers, AuthService]
    };
  }
}
