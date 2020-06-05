import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishDetailComponent } from './finish-detail.component';

describe('FinishDetailComponent', () => {
  let component: FinishDetailComponent;
  let fixture: ComponentFixture<FinishDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
