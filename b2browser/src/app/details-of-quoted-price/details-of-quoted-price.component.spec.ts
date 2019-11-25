import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfQuotedPriceComponent } from './details-of-quoted-price.component';

describe('DetailsOfQuotedPriceComponent', () => {
  let component: DetailsOfQuotedPriceComponent;
  let fixture: ComponentFixture<DetailsOfQuotedPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOfQuotedPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfQuotedPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
