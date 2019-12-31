import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { FavoriteMySuffixUpdateComponent } from 'app/entities/favorite-my-suffix/favorite-my-suffix-update.component';
import { FavoriteMySuffixService } from 'app/entities/favorite-my-suffix/favorite-my-suffix.service';
import { FavoriteMySuffix } from 'app/shared/model/favorite-my-suffix.model';

describe('Component Tests', () => {
  describe('FavoriteMySuffix Management Update Component', () => {
    let comp: FavoriteMySuffixUpdateComponent;
    let fixture: ComponentFixture<FavoriteMySuffixUpdateComponent>;
    let service: FavoriteMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [FavoriteMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FavoriteMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FavoriteMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FavoriteMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FavoriteMySuffix(123);
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
        const entity = new FavoriteMySuffix();
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
