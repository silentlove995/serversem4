import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { PlaylistMySuffixDetailComponent } from 'app/entities/playlist-my-suffix/playlist-my-suffix-detail.component';
import { PlaylistMySuffix } from 'app/shared/model/playlist-my-suffix.model';

describe('Component Tests', () => {
  describe('PlaylistMySuffix Management Detail Component', () => {
    let comp: PlaylistMySuffixDetailComponent;
    let fixture: ComponentFixture<PlaylistMySuffixDetailComponent>;
    const route = ({ data: of({ playlist: new PlaylistMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PlaylistMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaylistMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaylistMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load playlist on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.playlist).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
