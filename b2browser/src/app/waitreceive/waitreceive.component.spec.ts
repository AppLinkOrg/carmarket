import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitreceiveComponent } from './waitreceive.component';

describe('WaitreceiveComponent', () => {
  let component: WaitreceiveComponent;
  let fixture: ComponentFixture<WaitreceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitreceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitreceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
