import { Component, inject } from '@angular/core';
import { CommonTranslateService } from 'src/app/services/translate/translate.service';

@Component({
  selector: 'app-switch-translate',
  templateUrl: './switch-translate.component.html',
  styleUrls: ['./switch-translate.component.scss'],
})
export class SwitchTranslateComponent {
  public commonTranslateService = inject(CommonTranslateService);

  changeLanguage(): void {
    this.commonTranslateService.changeLanguage();
  }
}
