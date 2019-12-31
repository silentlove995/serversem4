import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPagesMySuffix, PagesMySuffix } from 'app/shared/model/pages-my-suffix.model';
import { PagesMySuffixService } from './pages-my-suffix.service';

@Component({
  selector: 'jhi-pages-my-suffix-update',
  templateUrl: './pages-my-suffix-update.component.html'
})
export class PagesMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    avatar: [],
    idol: []
  });

  constructor(protected pagesService: PagesMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pages }) => {
      this.updateForm(pages);
    });
  }

  updateForm(pages: IPagesMySuffix): void {
    this.editForm.patchValue({
      id: pages.id,
      name: pages.name,
      avatar: pages.avatar,
      idol: pages.idol
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pages = this.createFromForm();
    if (pages.id !== undefined) {
      this.subscribeToSaveResponse(this.pagesService.update(pages));
    } else {
      this.subscribeToSaveResponse(this.pagesService.create(pages));
    }
  }

  private createFromForm(): IPagesMySuffix {
    return {
      ...new PagesMySuffix(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      avatar: this.editForm.get(['avatar'])!.value,
      idol: this.editForm.get(['idol'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagesMySuffix>>): void {
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
}
