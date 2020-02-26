import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsumePage } from './consume.page';

describe('ConsumePage', () => {
  let component: ConsumePage;
  let fixture: ComponentFixture<ConsumePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
