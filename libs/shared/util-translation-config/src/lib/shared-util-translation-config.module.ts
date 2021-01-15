import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  TranslocoConfig,
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TRANSLOCO_SCOPE
} from '@ngneat/transloco';
import {
  TranslocoPersistLangModule,
  TRANSLOCO_PERSIST_LANG_STORAGE
} from '@ngneat/transloco-persist-lang';

import { TranslationPath } from './tokens';
import { HttpLoader } from './translation-loader.service';

export type AvailableLang = string | { id: string; label: string } | undefined;

@NgModule({
  imports: [
    CommonModule,
    TranslocoModule,
    // saves in the selected language in the given storage (supports cookies)
    TranslocoPersistLangModule.init({
      storage: {
        provide: TRANSLOCO_PERSIST_LANG_STORAGE,
        useValue: localStorage
      }
    })
  ],
  exports: [TranslocoModule]
})
export class SharedUtilTranslationConfigModule {
  static forRoot(
    prodMode: boolean,
    translationPath: string,
    availableLangs: AvailableLang[] = [{ id: 'en', label: 'English' }]
  ): ModuleWithProviders<SharedUtilTranslationConfigModule> {
    return {
      ngModule: SharedUtilTranslationConfigModule,
      providers: [
        {
          provide: TRANSLOCO_CONFIG,
          useValue: {
            availableLangs: availableLangs,
            defaultLang: 'en',
            prodMode: prodMode,
            flatten: {
              aot: prodMode
            }
          } as TranslocoConfig
        },
        {
          provide: TRANSLOCO_LOADER,
          useClass: HttpLoader
        },{
          provide: TranslationPath,
          useValue: translationPath
        }
      ]
    };
  }
  static forChild(
    scopeName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loader: any
  ): ModuleWithProviders<SharedUtilTranslationConfigModule> {
    return {
      ngModule: SharedUtilTranslationConfigModule,
      providers: [
        {
          provide: TRANSLOCO_SCOPE,
          useValue: {
            scope: scopeName,
            loader
          }
        }
      ]
    };
  }
}
