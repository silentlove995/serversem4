import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFavoriteMySuffix, FavoriteMySuffix } from 'app/shared/model/favorite-my-suffix.model';
import { FavoriteMySuffixService } from './favorite-my-suffix.service';

@Component({
  selector: 'jhi-favorite-my-suffix-update',
  templateUrl: './favorite-my-suffix-update.component.html'
})
export class FavoriteMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    user: [],
    song: []
  });

  constructor(protected favoriteService: FavoriteMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ favorite }) => {
      this.updateForm(favorite);
    });
  }

  updateForm(favorite: IFavoriteMySuffix): void {
    this.editForm.patchValue({
      id: favorite.id,
      user: favorite.user,
      song: favorite.song
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const favorite = this.createFromForm();
    if (favorite.id !== undefined) {
      this.subscribeToSaveResponse(this.favoriteService.update(favorite));
    } else {
      this.subscribeToSaveResponse(this.favoriteService.create(favorite));
    }
  }

  private createFromForm(): IFavoriteMySuffix {
    return {
      ...new FavoriteMySuffix(),
      id: this.editForm.get(['id'])!.value,
      user: this.editForm.get(['user'])!.value,
      song: this.editForm.get(['song'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFavoriteMySuffix>>): void {
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
