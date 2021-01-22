import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

const deps = [
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatInputModule,
  MatCheckboxModule
];

@NgModule({
  imports: deps,
  exports: deps
})
export class MaterialDepsModule {}
