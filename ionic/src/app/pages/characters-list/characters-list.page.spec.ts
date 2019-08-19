import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersListPage } from './characters-list.page';

describe('CharactersListPage', () => {
  let component: CharactersListPage;
  let fixture: ComponentFixture<CharactersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
