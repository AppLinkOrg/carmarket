import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedGoodsDetailComponent } from './received-goods-detail.component';

describe('ReceivedGoodsDetailComponent', () => {
  let component: ReceivedGoodsDetailComponent;
  let fixture: ComponentFixture<ReceivedGoodsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedGoodsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedGoodsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
