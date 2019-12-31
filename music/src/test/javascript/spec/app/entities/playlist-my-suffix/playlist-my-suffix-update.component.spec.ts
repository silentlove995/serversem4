import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { PlaylistMySuffixUpdateComponent } from 'app/entities/playlist-my-suffix/playlist-my-suffix-update.component';
import { PlaylistMySuffixService } from 'app/entities/playlist-my-suffix/playlist-my-suffix.service';
import { PlaylistMySuffix } from 'app/shared/model/playlist-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaylistMySuffix Management Update Component', () => {
    let comp: PlaylistMySuffixUpdateComponent;
    let fixture: ComponentFixture<PlaylistMySuffixUpdateComponent>;
    let service: PlaylistMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PlaylistMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaylistMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaylistMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaylistMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaylistMySuffix(123);
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
        const entity = new PlaylistMySuffix();
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
