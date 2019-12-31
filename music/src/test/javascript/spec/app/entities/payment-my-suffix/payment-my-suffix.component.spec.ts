import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MusicTestModule } from '../../../test.module';
import { PaymentMySuffixComponent } from 'app/entities/payment-my-suffix/payment-my-suffix.component';
import { PaymentMySuffixService } from 'app/entities/payment-my-suffix/payment-my-suffix.service';
import { PaymentMySuffix } from 'app/shared/model/payment-my-suffix.model';

describe('Component Tests', () => {
  describe('PaymentMySuffix Management Component', () => {
    let comp: PaymentMySuffixComponent;
    let fixture: ComponentFixture<PaymentMySuffixComponent>;
    let service: PaymentMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PaymentMySuffixComponent],
        providers: []
      })
        .overrideTemplate(PaymentMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaymentMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.payments && comp.payments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
