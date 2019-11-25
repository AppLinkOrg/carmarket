import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendGoodsDetailComponent } from './send-goods-detail.component';

describe('SendGoodsDetailComponent', () => {
  let component: SendGoodsDetailComponent;
  let fixture: ComponentFixture<SendGoodsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendGoodsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendGoodsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
