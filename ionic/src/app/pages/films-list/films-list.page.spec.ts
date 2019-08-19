import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsListPage } from './films-list.page';

describe('FilmsListPage', () => {
  let component: FilmsListPage;
  let fixture: ComponentFixture<FilmsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
