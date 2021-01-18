import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

const deps = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
];

@NgModule({
  imports: deps,
  exports: deps
})
export class AppMaterialDepsModule {}
