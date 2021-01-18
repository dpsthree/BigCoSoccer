import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedUtilTranslationConfigModule } from '@bsc/shared/util-translation-config';

import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUtilTranslationConfigModule.forChild('sharedUiComponents')
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class SharedUiComponentsModule {}
