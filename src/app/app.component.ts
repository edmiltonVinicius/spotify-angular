import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private translate = inject(TranslateService);

  ngOnInit(): void {
    const languageStorage = localStorage.getItem('language');
    if (languageStorage) {
      this.translate.use(languageStorage);
      return;
    }

    const browserLanguage = this.translate.getBrowserLang();
    this.translate.use(browserLanguage ?? 'en');
  }
}
