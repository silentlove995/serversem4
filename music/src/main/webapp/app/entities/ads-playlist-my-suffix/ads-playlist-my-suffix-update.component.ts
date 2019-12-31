import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAdsPlaylistMySuffix, AdsPlaylistMySuffix } from 'app/shared/model/ads-playlist-my-suffix.model';
import { AdsPlaylistMySuffixService } from './ads-playlist-my-suffix.service';

@Component({
  selector: 'jhi-ads-playlist-my-suffix-update',
  templateUrl: './ads-playlist-my-suffix-update.component.html'
})
export class AdsPlaylistMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    content: [],
    image: [],
    playlistId: []
  });

  constructor(
    protected adsPlaylistService: AdsPlaylistMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adsPlaylist }) => {
      this.updateForm(adsPlaylist);
    });
  }

  updateForm(adsPlaylist: IAdsPlaylistMySuffix): void {
    this.editForm.patchValue({
      id: adsPlaylist.id,
      content: adsPlaylist.content,
      image: adsPlaylist.image,
      playlistId: adsPlaylist.playlistId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adsPlaylist = this.createFromForm();
    if (adsPlaylist.id !== undefined) {
      this.subscribeToSaveResponse(this.adsPlaylistService.update(adsPlaylist));
    } else {
      this.subscribeToSaveResponse(this.adsPlaylistService.create(adsPlaylist));
    }
  }

  private createFromForm(): IAdsPlaylistMySuffix {
    return {
      ...new AdsPlaylistMySuffix(),
      id: this.editForm.get(['id'])!.value,
      content: this.editForm.get(['content'])!.value,
      image: this.editForm.get(['image'])!.value,
      playlistId: this.editForm.get(['playlistId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdsPlaylistMySuffix>>): void {
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
