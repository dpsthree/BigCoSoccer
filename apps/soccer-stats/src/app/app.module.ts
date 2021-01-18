import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedDataAccessAuthModule } from '@bsc/shared/data-access-auth';
import { SharedDataAccessAuthzModule } from '@bsc/shared/data-access-authz';
import { SharedUtilTranslationConfigModule } from '@bsc/shared/util-translation-config';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialDepsModule } from './app-material-deps.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialDepsModule,
    SharedDataAccessAuthModule.forRoot(environment.authenticationConfig),
    SharedDataAccessAuthzModule.forRoot(environment.authorizationConfig),
    SharedUtilTranslationConfigModule.forRoot(
      environment.production,
      './assets/i18n'
    ),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
