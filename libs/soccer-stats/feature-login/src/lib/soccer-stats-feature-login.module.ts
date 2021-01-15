import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedUiComponentsModule } from '@bsc/shared/ui-components';

import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiComponentsModule
  ],
  declarations: [LoginPageComponent]
})
export class SoccerStatsFeatureLoginModule {}
