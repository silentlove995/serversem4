import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { MusicTestModule } from '../../../test.module';
import { SongsMySuffixComponent } from 'app/entities/songs-my-suffix/songs-my-suffix.component';
import { SongsMySuffixService } from 'app/entities/songs-my-suffix/songs-my-suffix.service';
import { SongsMySuffix } from 'app/shared/model/songs-my-suffix.model';

describe('Component Tests', () => {
  describe('SongsMySuffix Management Component', () => {
    let comp: SongsMySuffixComponent;
    let fixture: ComponentFixture<SongsMySuffixComponent>;
    let service: SongsMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [SongsMySuffixComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(SongsMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SongsMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SongsMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SongsMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.songs && comp.songs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SongsMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.songs && comp.songs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
