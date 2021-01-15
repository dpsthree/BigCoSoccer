import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedDataAccessAuthModule } from '@bsc/shared/data-access-auth';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedDataAccessAuthModule.forRoot(environment.authenticationConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
