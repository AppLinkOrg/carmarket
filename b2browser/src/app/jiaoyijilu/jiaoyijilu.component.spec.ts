import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiaoyijiluComponent } from './jiaoyijilu.component';

describe('JiaoyijiluComponent', () => {
  let component: JiaoyijiluComponent;
  let fixture: ComponentFixture<JiaoyijiluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiaoyijiluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiaoyijiluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
