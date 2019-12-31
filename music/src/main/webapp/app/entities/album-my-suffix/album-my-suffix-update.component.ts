import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAlbumMySuffix, AlbumMySuffix } from 'app/shared/model/album-my-suffix.model';
import { AlbumMySuffixService } from './album-my-suffix.service';

@Component({
  selector: 'jhi-album-my-suffix-update',
  templateUrl: './album-my-suffix-update.component.html'
})
export class AlbumMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    vocal: [],
    thumbnail: []
  });

  constructor(protected albumService: AlbumMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => {
      this.updateForm(album);
    });
  }

  updateForm(album: IAlbumMySuffix): void {
    this.editForm.patchValue({
      id: album.id,
      title: album.title,
      description: album.description,
      vocal: album.vocal,
      thumbnail: album.thumbnail
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const album = this.createFromForm();
    if (album.id !== undefined) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  private createFromForm(): IAlbumMySuffix {
    return {
      ...new AlbumMySuffix(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      vocal: this.editForm.get(['vocal'])!.value,
      thumbnail: this.editForm.get(['thumbnail'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbumMySuffix>>): void {
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
