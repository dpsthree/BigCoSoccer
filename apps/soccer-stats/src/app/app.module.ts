import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedDataAccessAuthModule } from '@bsc/shared/data-access-auth';
import { SharedDataAccessAuthzModule } from '@bsc/shared/data-access-authz';
import { SharedUtilTranslationConfigModule} from '@bsc/shared/util-translation-config';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedDataAccessAuthModule.forRoot(environment.authenticationConfig),
    SharedDataAccessAuthzModule.forRoot(environment.authorizationConfig),
    SharedUtilTranslationConfigModule.forRoot(environment.production, './assets/i18n')
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
