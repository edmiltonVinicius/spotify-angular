import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SwitchTranslateComponent } from './switch-translate.component';

describe('SwitchTranslateComponent', () => {
  let component: SwitchTranslateComponent;
  let fixture: ComponentFixture<SwitchTranslateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SwitchTranslateComponent]
    });
    fixture = TestBed.createComponent(SwitchTranslateComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
