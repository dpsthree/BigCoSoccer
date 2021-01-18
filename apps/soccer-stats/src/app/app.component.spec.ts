import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedDataAccessAuthModule } from '@bsc/shared/data-access-auth';
import { SharedDataAccessAuthzModule } from '@bsc/shared/data-access-authz';
import { SharedUtilTranslationConfigModule } from '@bsc/shared/util-translation-config';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

// Test the ability to create the component
// Component should have no functionality.
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // We will eventually want to make
        // the following line disappear
        HttpClientModule,
        SharedDataAccessAuthModule.forRoot(environment.authenticationConfig),
        SharedDataAccessAuthzModule.forRoot(environment.authorizationConfig),
        RouterTestingModule.withRoutes([]),
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
