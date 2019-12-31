import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { MusicTestModule } from '../../../test.module';
import { AdsSongMySuffixComponent } from 'app/entities/ads-song-my-suffix/ads-song-my-suffix.component';
import { AdsSongMySuffixService } from 'app/entities/ads-song-my-suffix/ads-song-my-suffix.service';
import { AdsSongMySuffix } from 'app/shared/model/ads-song-my-suffix.model';

describe('Component Tests', () => {
  describe('AdsSongMySuffix Management Component', () => {
    let comp: AdsSongMySuffixComponent;
    let fixture: ComponentFixture<AdsSongMySuffixComponent>;
    let service: AdsSongMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [AdsSongMySuffixComponent],
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
        .overrideTemplate(AdsSongMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdsSongMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdsSongMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AdsSongMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.adsSongs && comp.adsSongs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AdsSongMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.adsSongs && comp.adsSongs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
