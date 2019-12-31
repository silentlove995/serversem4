import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { PagesMySuffixDetailComponent } from 'app/entities/pages-my-suffix/pages-my-suffix-detail.component';
import { PagesMySuffix } from 'app/shared/model/pages-my-suffix.model';

describe('Component Tests', () => {
  describe('PagesMySuffix Management Detail Component', () => {
    let comp: PagesMySuffixDetailComponent;
    let fixture: ComponentFixture<PagesMySuffixDetailComponent>;
    const route = ({ data: of({ pages: new PagesMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PagesMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PagesMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagesMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pages on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pages).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
