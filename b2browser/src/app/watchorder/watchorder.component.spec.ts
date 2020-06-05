import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchorderComponent } from './watchorder.component';

describe('WatchorderComponent', () => {
  let component: WatchorderComponent;
  let fixture: ComponentFixture<WatchorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
