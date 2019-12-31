import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { AdsPlaylistMySuffixDetailComponent } from 'app/entities/ads-playlist-my-suffix/ads-playlist-my-suffix-detail.component';
import { AdsPlaylistMySuffix } from 'app/shared/model/ads-playlist-my-suffix.model';

describe('Component Tests', () => {
  describe('AdsPlaylistMySuffix Management Detail Component', () => {
    let comp: AdsPlaylistMySuffixDetailComponent;
    let fixture: ComponentFixture<AdsPlaylistMySuffixDetailComponent>;
    const route = ({ data: of({ adsPlaylist: new AdsPlaylistMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [AdsPlaylistMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AdsPlaylistMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdsPlaylistMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load adsPlaylist on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.adsPlaylist).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
