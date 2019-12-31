import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { SongsMySuffixUpdateComponent } from 'app/entities/songs-my-suffix/songs-my-suffix-update.component';
import { SongsMySuffixService } from 'app/entities/songs-my-suffix/songs-my-suffix.service';
import { SongsMySuffix } from 'app/shared/model/songs-my-suffix.model';

describe('Component Tests', () => {
  describe('SongsMySuffix Management Update Component', () => {
    let comp: SongsMySuffixUpdateComponent;
    let fixture: ComponentFixture<SongsMySuffixUpdateComponent>;
    let service: SongsMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [SongsMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SongsMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SongsMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SongsMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SongsMySuffix(123);
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
        const entity = new SongsMySuffix();
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
