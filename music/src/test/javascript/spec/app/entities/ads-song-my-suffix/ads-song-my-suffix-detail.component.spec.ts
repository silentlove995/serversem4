import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { AdsSongMySuffixDetailComponent } from 'app/entities/ads-song-my-suffix/ads-song-my-suffix-detail.component';
import { AdsSongMySuffix } from 'app/shared/model/ads-song-my-suffix.model';

describe('Component Tests', () => {
  describe('AdsSongMySuffix Management Detail Component', () => {
    let comp: AdsSongMySuffixDetailComponent;
    let fixture: ComponentFixture<AdsSongMySuffixDetailComponent>;
    const route = ({ data: of({ adsSong: new AdsSongMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [AdsSongMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AdsSongMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdsSongMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load adsSong on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.adsSong).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
