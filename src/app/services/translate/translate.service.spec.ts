import { TestBed } from '@angular/core/testing';
import { CommonTranslateService } from './translate.service';
import { TranslateService } from '@ngx-translate/core';

class TranslateServiceStub {
  currentLang = 'en';
  use = () => {};
}

describe('CommonTranslateService', () => {
  let service: CommonTranslateService;
  let translateServiceMock: TranslateServiceStub;

  beforeEach(() => {
    translateServiceMock = new TranslateServiceStub();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    });
    service = TestBed.inject(CommonTranslateService);
  });

  it('should be created!', () => {
    expect(service).toBeTruthy();
  });

  describe('getNextLanguageOption', () => {
    it('should return POR when current language is en', () => {
      translateServiceMock.currentLang = 'en';
      const spy = service['getNextLanguageOption']();
      expect(spy).toEqual('POR');
    });

    it('should return ENG when current language is pt', () => {
      translateServiceMock.currentLang = 'pt';
      const spy = service['getNextLanguageOption']();
      expect(spy).toEqual('ENG');
    });
  });

  describe('changeLanguage', () => {
    it('should return POR when language is en', () => {
      translateServiceMock.currentLang = 'en';

      service.changeLanguage();
      expect(service.language).toEqual('ENG');
    });

    it('should return ENG when language is pt', () => {
      translateServiceMock.currentLang = 'pt';
      service.changeLanguage();
      expect(service.language).toEqual('POR');
    });
  });

  describe('getTextLanguage', () => {
    it('should return name the language updated and uppercase', () => {
      const spy = service['getTextLanguage']('pt');
      expect(spy).toEqual('POR');
    });

    it('should return name the language updated and uppercase', () => {
      const spy = service['getTextLanguage']('en');
      expect(spy).toEqual('ENG');
    });

    it('should return name the default language if a invalid param is passed', () => {
      const spy = service['getTextLanguage']('INVALID_PARAM' as any);
      expect(spy).toEqual('POR');
    });
  });
});
