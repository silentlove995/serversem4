import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { AlbumMySuffixUpdateComponent } from 'app/entities/album-my-suffix/album-my-suffix-update.component';
import { AlbumMySuffixService } from 'app/entities/album-my-suffix/album-my-suffix.service';
import { AlbumMySuffix } from 'app/shared/model/album-my-suffix.model';

describe('Component Tests', () => {
  describe('AlbumMySuffix Management Update Component', () => {
    let comp: AlbumMySuffixUpdateComponent;
    let fixture: ComponentFixture<AlbumMySuffixUpdateComponent>;
    let service: AlbumMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [AlbumMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AlbumMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlbumMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlbumMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AlbumMySuffix(123);
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
        const entity = new AlbumMySuffix();
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
