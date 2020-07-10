import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCenterComponent } from './quote-center.component';

describe('QuoteCenterComponent', () => {
  let component: QuoteCenterComponent;
  let fixture: ComponentFixture<QuoteCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
