import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { MusicTestModule } from '../../../test.module';
import { SongsMySuffixDetailComponent } from 'app/entities/songs-my-suffix/songs-my-suffix-detail.component';
import { SongsMySuffix } from 'app/shared/model/songs-my-suffix.model';

describe('Component Tests', () => {
  describe('SongsMySuffix Management Detail Component', () => {
    let comp: SongsMySuffixDetailComponent;
    let fixture: ComponentFixture<SongsMySuffixDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ songs: new SongsMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [SongsMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SongsMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SongsMySuffixDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load songs on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.songs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
