import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCenterComponent } from './return-center.component';

describe('ReturnCenterComponent', () => {
  let component: ReturnCenterComponent;
  let fixture: ComponentFixture<ReturnCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
