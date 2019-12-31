import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { PaymentMySuffixDetailComponent } from 'app/entities/payment-my-suffix/payment-my-suffix-detail.component';
import { PaymentMySuffix } from 'app/shared/model/payment-my-suffix.model';

describe('Component Tests', () => {
  describe('PaymentMySuffix Management Detail Component', () => {
    let comp: PaymentMySuffixDetailComponent;
    let fixture: ComponentFixture<PaymentMySuffixDetailComponent>;
    const route = ({ data: of({ payment: new PaymentMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PaymentMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PaymentMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaymentMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load payment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.payment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
