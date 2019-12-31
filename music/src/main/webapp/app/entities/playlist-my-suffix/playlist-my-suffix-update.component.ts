import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPlaylistMySuffix, PlaylistMySuffix } from 'app/shared/model/playlist-my-suffix.model';
import { PlaylistMySuffixService } from './playlist-my-suffix.service';
import { IAdsPlaylistMySuffix } from 'app/shared/model/ads-playlist-my-suffix.model';
import { AdsPlaylistMySuffixService } from 'app/entities/ads-playlist-my-suffix/ads-playlist-my-suffix.service';

@Component({
  selector: 'jhi-playlist-my-suffix-update',
  templateUrl: './playlist-my-suffix-update.component.html'
})
export class PlaylistMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  ads: IAdsPlaylistMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    vocal: [],
    thumbnail: [],
    adsId: []
  });

  constructor(
    protected playlistService: PlaylistMySuffixService,
    protected adsPlaylistService: AdsPlaylistMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.updateForm(playlist);

      this.adsPlaylistService
        .query({ 'playlistId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IAdsPlaylistMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdsPlaylistMySuffix[]) => {
          if (!playlist.adsId) {
            this.ads = resBody;
          } else {
            this.adsPlaylistService
              .find(playlist.adsId)
              .pipe(
                map((subRes: HttpResponse<IAdsPlaylistMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAdsPlaylistMySuffix[]) => {
                this.ads = concatRes;
              });
          }
        });
    });
  }

  updateForm(playlist: IPlaylistMySuffix): void {
    this.editForm.patchValue({
      id: playlist.id,
      title: playlist.title,
      description: playlist.description,
      vocal: playlist.vocal,
      thumbnail: playlist.thumbnail,
      adsId: playlist.adsId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const playlist = this.createFromForm();
    if (playlist.id !== undefined) {
      this.subscribeToSaveResponse(this.playlistService.update(playlist));
    } else {
      this.subscribeToSaveResponse(this.playlistService.create(playlist));
    }
  }

  private createFromForm(): IPlaylistMySuffix {
    return {
      ...new PlaylistMySuffix(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      vocal: this.editForm.get(['vocal'])!.value,
      thumbnail: this.editForm.get(['thumbnail'])!.value,
      adsId: this.editForm.get(['adsId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaylistMySuffix>>): void {
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

  trackById(index: number, item: IAdsPlaylistMySuffix): any {
    return item.id;
  }
}
