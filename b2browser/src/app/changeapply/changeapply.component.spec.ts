import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeapplyComponent } from './changeapply.component';

describe('ChangeapplyComponent', () => {
  let component: ChangeapplyComponent;
  let fixture: ComponentFixture<ChangeapplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeapplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeapplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
