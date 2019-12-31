import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { PostsMySuffixUpdateComponent } from 'app/entities/posts-my-suffix/posts-my-suffix-update.component';
import { PostsMySuffixService } from 'app/entities/posts-my-suffix/posts-my-suffix.service';
import { PostsMySuffix } from 'app/shared/model/posts-my-suffix.model';

describe('Component Tests', () => {
  describe('PostsMySuffix Management Update Component', () => {
    let comp: PostsMySuffixUpdateComponent;
    let fixture: ComponentFixture<PostsMySuffixUpdateComponent>;
    let service: PostsMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PostsMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PostsMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PostsMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PostsMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PostsMySuffix(123);
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
        const entity = new PostsMySuffix();
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
