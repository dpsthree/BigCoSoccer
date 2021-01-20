import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedDataAccessAuthModule } from '@bsc/shared/data-access-auth';
import { SharedDataAccessAuthzModule } from '@bsc/shared/data-access-authz';
import {
  MaterialNotificationService,
  SharedUtilAsyncHelpersModule
} from '@bsc/shared/util-async-helpers';
import { SharedUtilTranslationConfigModule } from '@bsc/shared/util-translation-config';
import { reducers } from '@bsc/soccer-stats/data-access-app-state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppMaterialDepsModule } from './app-material-deps.module';
import { AppComponent } from './app.component';

// Test the ability to create the component
// Component should have no functionality.
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // We will eventually want to make
        // most of this disappear
        HttpClientModule,
        AppMaterialDepsModule,
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
        SharedDataAccessAuthModule.forRoot(environment.authenticationConfig),
        SharedDataAccessAuthzModule.forRoot(environment.authorizationConfig),
        RouterTestingModule.withRoutes([]),
        SharedUtilAsyncHelpersModule.forRoot(MaterialNotificationService),
        SharedUtilTranslationConfigModule.forRoot(
          environment.production,
          './assets/i18n'
        )
      ],
      declarations: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
