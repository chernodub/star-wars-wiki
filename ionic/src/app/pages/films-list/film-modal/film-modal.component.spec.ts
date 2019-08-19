import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmModalComponent } from './film-modal.component';

describe('FilmModalComponent', () => {
  let component: FilmModalComponent;
  let fixture: ComponentFixture<FilmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
