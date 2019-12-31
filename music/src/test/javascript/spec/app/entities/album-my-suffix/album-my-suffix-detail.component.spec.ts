import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { AlbumMySuffixDetailComponent } from 'app/entities/album-my-suffix/album-my-suffix-detail.component';
import { AlbumMySuffix } from 'app/shared/model/album-my-suffix.model';

describe('Component Tests', () => {
  describe('AlbumMySuffix Management Detail Component', () => {
    let comp: AlbumMySuffixDetailComponent;
    let fixture: ComponentFixture<AlbumMySuffixDetailComponent>;
    const route = ({ data: of({ album: new AlbumMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [AlbumMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AlbumMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlbumMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load album on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.album).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
