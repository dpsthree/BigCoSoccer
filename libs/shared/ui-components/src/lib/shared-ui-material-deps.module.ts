import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const deps = [MatButtonModule, MatFormFieldModule, MatInputModule];

@NgModule({
  imports: deps,
  exports: deps
})
export class SharedUiMaterialDepsModule {}
