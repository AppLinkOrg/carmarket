import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationCenterComponent } from './quotation-center.component';

describe('QuotationCenterComponent', () => {
  let component: QuotationCenterComponent;
  let fixture: ComponentFixture<QuotationCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
