import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { AdsSongMySuffixUpdateComponent } from 'app/entities/ads-song-my-suffix/ads-song-my-suffix-update.component';
import { AdsSongMySuffixService } from 'app/entities/ads-song-my-suffix/ads-song-my-suffix.service';
import { AdsSongMySuffix } from 'app/shared/model/ads-song-my-suffix.model';

describe('Component Tests', () => {
  describe('AdsSongMySuffix Management Update Component', () => {
    let comp: AdsSongMySuffixUpdateComponent;
    let fixture: ComponentFixture<AdsSongMySuffixUpdateComponent>;
    let service: AdsSongMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [AdsSongMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AdsSongMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdsSongMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdsSongMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AdsSongMySuffix(123);
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
        const entity = new AdsSongMySuffix();
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
