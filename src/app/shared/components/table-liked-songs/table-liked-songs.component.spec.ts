import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLikedSongsComponent } from './table-liked-songs.component';

describe('TableLikedSongsComponent', () => {
  let component: TableLikedSongsComponent;
  let fixture: ComponentFixture<TableLikedSongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableLikedSongsComponent]
    });
    fixture = TestBed.createComponent(TableLikedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
