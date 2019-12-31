import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MusicTestModule } from '../../../test.module';
import { PostsMySuffixDetailComponent } from 'app/entities/posts-my-suffix/posts-my-suffix-detail.component';
import { PostsMySuffix } from 'app/shared/model/posts-my-suffix.model';

describe('Component Tests', () => {
  describe('PostsMySuffix Management Detail Component', () => {
    let comp: PostsMySuffixDetailComponent;
    let fixture: ComponentFixture<PostsMySuffixDetailComponent>;
    const route = ({ data: of({ posts: new PostsMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PostsMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PostsMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PostsMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load posts on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.posts).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
