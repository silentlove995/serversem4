import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { PagesMySuffixUpdateComponent } from 'app/entities/pages-my-suffix/pages-my-suffix-update.component';
import { PagesMySuffixService } from 'app/entities/pages-my-suffix/pages-my-suffix.service';
import { PagesMySuffix } from 'app/shared/model/pages-my-suffix.model';

describe('Component Tests', () => {
  describe('PagesMySuffix Management Update Component', () => {
    let comp: PagesMySuffixUpdateComponent;
    let fixture: ComponentFixture<PagesMySuffixUpdateComponent>;
    let service: PagesMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PagesMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PagesMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagesMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagesMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PagesMySuffix(123);
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
        const entity = new PagesMySuffix();
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
