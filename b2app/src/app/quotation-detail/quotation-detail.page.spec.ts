import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuotationDetailPage } from './quotation-detail.page';

describe('QuotationDetailPage', () => {
  let component: QuotationDetailPage;
  let fixture: ComponentFixture<QuotationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
