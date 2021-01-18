import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedUtilTranslationConfigModule } from '@bsc/shared/util-translation-config';

import { LoginFormComponent } from './login-form/login-form.component';
import { SharedUiMaterialDepsModule } from './shared-ui-material-deps.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUtilTranslationConfigModule.forChild('sharedUiComponents'),
    SharedUiMaterialDepsModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class SharedUiComponentsModule {}
