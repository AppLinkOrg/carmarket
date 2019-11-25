import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsManagementComponent } from './returns-management.component';

describe('ReturnsManagementComponent', () => {
  let component: ReturnsManagementComponent;
  let fixture: ComponentFixture<ReturnsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
