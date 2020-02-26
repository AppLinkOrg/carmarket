import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YibaojiaPage } from './yibaojia.page';

describe('YibaojiaPage', () => {
  let component: YibaojiaPage;
  let fixture: ComponentFixture<YibaojiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YibaojiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YibaojiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
