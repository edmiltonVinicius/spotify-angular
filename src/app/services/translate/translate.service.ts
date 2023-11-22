import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageENum } from '../../enum/language.enum';

@Injectable({
  providedIn: 'root',
})
export class CommonTranslateService {
  public language = '';

  constructor(private translate: TranslateService) {
    this.language = this.getNextLanguageOption();
  }

  private getNextLanguageOption(): string {
    const nextLanguage = this.translate.currentLang === 'en' ? 'pt' : 'en';
    return this.getTextLanguage(nextLanguage);
  }

  private getTextLanguage(lang: keyof typeof LanguageENum): string {
    return lang === 'en' ? 'ENG' : 'POR';
  }

  public changeLanguage(): void {
    this.language = this.getTextLanguage(
      this.translate.currentLang as LanguageENum
    );
    const newLanguage = this.translate.currentLang === 'en' ? 'pt' : 'en';
    this.translate.use(newLanguage);
    localStorage.setItem('language', newLanguage);
  }
}
