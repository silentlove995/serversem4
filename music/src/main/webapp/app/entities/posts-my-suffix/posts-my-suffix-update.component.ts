import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPostsMySuffix, PostsMySuffix } from 'app/shared/model/posts-my-suffix.model';
import { PostsMySuffixService } from './posts-my-suffix.service';
import { IPagesMySuffix } from 'app/shared/model/pages-my-suffix.model';
import { PagesMySuffixService } from 'app/entities/pages-my-suffix/pages-my-suffix.service';

@Component({
  selector: 'jhi-posts-my-suffix-update',
  templateUrl: './posts-my-suffix-update.component.html'
})
export class PostsMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  pages: IPagesMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    content: [],
    comment: [],
    image: [],
    like: [],
    songAddress: [],
    pagesId: []
  });

  constructor(
    protected postsService: PostsMySuffixService,
    protected pagesService: PagesMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ posts }) => {
      this.updateForm(posts);

      this.pagesService
        .query()
        .pipe(
          map((res: HttpResponse<IPagesMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPagesMySuffix[]) => (this.pages = resBody));
    });
  }

  updateForm(posts: IPostsMySuffix): void {
    this.editForm.patchValue({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      comment: posts.comment,
      image: posts.image,
      like: posts.like,
      songAddress: posts.songAddress,
      pagesId: posts.pagesId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const posts = this.createFromForm();
    if (posts.id !== undefined) {
      this.subscribeToSaveResponse(this.postsService.update(posts));
    } else {
      this.subscribeToSaveResponse(this.postsService.create(posts));
    }
  }

  private createFromForm(): IPostsMySuffix {
    return {
      ...new PostsMySuffix(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      content: this.editForm.get(['content'])!.value,
      comment: this.editForm.get(['comment'])!.value,
      image: this.editForm.get(['image'])!.value,
      like: this.editForm.get(['like'])!.value,
      songAddress: this.editForm.get(['songAddress'])!.value,
      pagesId: this.editForm.get(['pagesId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPostsMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPagesMySuffix): any {
    return item.id;
  }
}
