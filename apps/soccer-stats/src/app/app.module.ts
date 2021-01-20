import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedDataAccessAuthModule } from '@bsc/shared/data-access-auth';
import { SharedDataAccessAuthzModule } from '@bsc/shared/data-access-authz';
import { SharedUtilTranslationConfigModule } from '@bsc/shared/util-translation-config';
import { reducers } from '@bsc/soccer-stats/data-access-app-state';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialDepsModule } from './app-material-deps.module';
import { AppStartupService } from './app-startup.service';
import {
  MaterialNotificationService,
  SharedUtilAsyncHelpersModule
} from '@bsc/shared/util-async-helpers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictStateSerializability: true,
        strictActionImmutability: true,
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppMaterialDepsModule,
    SharedUtilAsyncHelpersModule.forRoot(MaterialNotificationService),
    SharedDataAccessAuthModule.forRoot(environment.authenticationConfig),
    SharedDataAccessAuthzModule.forRoot(environment.authorizationConfig),
    SharedUtilTranslationConfigModule.forRoot(
      environment.production,
      './assets/i18n'
    ),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appStartupService: AppStartupService) => () =>
        appStartupService.startup(),
      deps: [AppStartupService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
