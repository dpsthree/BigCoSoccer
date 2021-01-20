import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { NotificationService } from './notification-service';

@NgModule({
  imports: [CommonModule]
})
export class SharedUtilAsyncHelpersModule {
  static forRoot(
    flavor: Type<NotificationService>
  ): ModuleWithProviders<SharedUtilAsyncHelpersModule> {
    return {
      ngModule: SharedUtilAsyncHelpersModule,
      providers: [
        {
          provide: NotificationService,
          useClass: flavor
        }
      ]
    };
  }
}
