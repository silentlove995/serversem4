import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { MusicTestModule } from '../../../test.module';
import { AdsPlaylistMySuffixComponent } from 'app/entities/ads-playlist-my-suffix/ads-playlist-my-suffix.component';
import { AdsPlaylistMySuffixService } from 'app/entities/ads-playlist-my-suffix/ads-playlist-my-suffix.service';
import { AdsPlaylistMySuffix } from 'app/shared/model/ads-playlist-my-suffix.model';

describe('Component Tests', () => {
  describe('AdsPlaylistMySuffix Management Component', () => {
    let comp: AdsPlaylistMySuffixComponent;
    let fixture: ComponentFixture<AdsPlaylistMySuffixComponent>;
    let service: AdsPlaylistMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [AdsPlaylistMySuffixComponent],
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
        .overrideTemplate(AdsPlaylistMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdsPlaylistMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdsPlaylistMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AdsPlaylistMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.adsPlaylists && comp.adsPlaylists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AdsPlaylistMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.adsPlaylists && comp.adsPlaylists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
