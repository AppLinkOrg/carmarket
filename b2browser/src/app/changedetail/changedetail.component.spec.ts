import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedetailComponent } from './changedetail.component';

describe('ChangedetailComponent', () => {
  let component: ChangedetailComponent;
  let fixture: ComponentFixture<ChangedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
