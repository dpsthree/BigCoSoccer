import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';

import { TranslationPath } from './tokens';

@Injectable({ providedIn: 'root' })
export class HttpLoader implements TranslocoLoader {
  constructor(
    private http: HttpClient,
    @Inject(TranslationPath) private translationPath: string
  ) {}

  getTranslation(langPath: string) {
    return this.http.get<Translation>(`${this.translationPath}/${langPath}.json`);
  }
}
