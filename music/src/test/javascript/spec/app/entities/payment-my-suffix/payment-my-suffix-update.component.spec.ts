import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { PaymentMySuffixUpdateComponent } from 'app/entities/payment-my-suffix/payment-my-suffix-update.component';
import { PaymentMySuffixService } from 'app/entities/payment-my-suffix/payment-my-suffix.service';
import { PaymentMySuffix } from 'app/shared/model/payment-my-suffix.model';

describe('Component Tests', () => {
  describe('PaymentMySuffix Management Update Component', () => {
    let comp: PaymentMySuffixUpdateComponent;
    let fixture: ComponentFixture<PaymentMySuffixUpdateComponent>;
    let service: PaymentMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PaymentMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PaymentMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaymentMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaymentMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
