import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { FavoriteMySuffixDetailComponent } from 'app/entities/favorite-my-suffix/favorite-my-suffix-detail.component';
import { FavoriteMySuffix } from 'app/shared/model/favorite-my-suffix.model';

describe('Component Tests', () => {
  describe('FavoriteMySuffix Management Detail Component', () => {
    let comp: FavoriteMySuffixDetailComponent;
    let fixture: ComponentFixture<FavoriteMySuffixDetailComponent>;
    const route = ({ data: of({ favorite: new FavoriteMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [FavoriteMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FavoriteMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FavoriteMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load favorite on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.favorite).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
