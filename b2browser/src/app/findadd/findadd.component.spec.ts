import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindaddComponent } from './findadd.component';

describe('FindaddComponent', () => {
  let component: FindaddComponent;
  let fixture: ComponentFixture<FindaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
