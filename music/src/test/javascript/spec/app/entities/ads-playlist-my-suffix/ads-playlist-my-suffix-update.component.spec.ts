import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { AdsPlaylistMySuffixUpdateComponent } from 'app/entities/ads-playlist-my-suffix/ads-playlist-my-suffix-update.component';
import { AdsPlaylistMySuffixService } from 'app/entities/ads-playlist-my-suffix/ads-playlist-my-suffix.service';
import { AdsPlaylistMySuffix } from 'app/shared/model/ads-playlist-my-suffix.model';

describe('Component Tests', () => {
  describe('AdsPlaylistMySuffix Management Update Component', () => {
    let comp: AdsPlaylistMySuffixUpdateComponent;
    let fixture: ComponentFixture<AdsPlaylistMySuffixUpdateComponent>;
    let service: AdsPlaylistMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [AdsPlaylistMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AdsPlaylistMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdsPlaylistMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdsPlaylistMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AdsPlaylistMySuffix(123);
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
        const entity = new AdsPlaylistMySuffix();
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
