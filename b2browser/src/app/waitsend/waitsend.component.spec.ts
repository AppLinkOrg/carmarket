import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitsendComponent } from './waitsend.component';

describe('WaitsendComponent', () => {
  let component: WaitsendComponent;
  let fixture: ComponentFixture<WaitsendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitsendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitsendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
