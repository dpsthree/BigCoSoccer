import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const deps = [
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: deps,
  exports: deps
})
export class MaterialDepsModule {}
