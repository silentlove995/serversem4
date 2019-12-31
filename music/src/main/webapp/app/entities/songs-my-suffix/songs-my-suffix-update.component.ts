import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISongsMySuffix, SongsMySuffix } from 'app/shared/model/songs-my-suffix.model';
import { SongsMySuffixService } from './songs-my-suffix.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IAdsSongMySuffix } from 'app/shared/model/ads-song-my-suffix.model';
import { AdsSongMySuffixService } from 'app/entities/ads-song-my-suffix/ads-song-my-suffix.service';
import { IPlaylistMySuffix } from 'app/shared/model/playlist-my-suffix.model';
import { PlaylistMySuffixService } from 'app/entities/playlist-my-suffix/playlist-my-suffix.service';
import { IAlbumMySuffix } from 'app/shared/model/album-my-suffix.model';
import { AlbumMySuffixService } from 'app/entities/album-my-suffix/album-my-suffix.service';
import { IFavoriteMySuffix } from 'app/shared/model/favorite-my-suffix.model';
import { FavoriteMySuffixService } from 'app/entities/favorite-my-suffix/favorite-my-suffix.service';

type SelectableEntity = IAdsSongMySuffix | IPlaylistMySuffix | IAlbumMySuffix | IFavoriteMySuffix;

@Component({
  selector: 'jhi-songs-my-suffix-update',
  templateUrl: './songs-my-suffix-update.component.html'
})
export class SongsMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  ads: IAdsSongMySuffix[] = [];

  playlists: IPlaylistMySuffix[] = [];

  albums: IAlbumMySuffix[] = [];

  favorites: IFavoriteMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    genre: [],
    vocal: [],
    country: [],
    description: [],
    songAddress: [],
    lyric: [],
    avatar: [],
    listenCount: [],
    favoriteCount: [],
    adsId: [],
    playlistId: [],
    albumId: [],
    favoriteId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected songsService: SongsMySuffixService,
    protected adsSongService: AdsSongMySuffixService,
    protected playlistService: PlaylistMySuffixService,
    protected albumService: AlbumMySuffixService,
    protected favoriteService: FavoriteMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ songs }) => {
      this.updateForm(songs);

      this.adsSongService
        .query({ 'songsId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IAdsSongMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdsSongMySuffix[]) => {
          if (!songs.adsId) {
            this.ads = resBody;
          } else {
            this.adsSongService
              .find(songs.adsId)
              .pipe(
                map((subRes: HttpResponse<IAdsSongMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAdsSongMySuffix[]) => {
                this.ads = concatRes;
              });
          }
        });

      this.playlistService
        .query()
        .pipe(
          map((res: HttpResponse<IPlaylistMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPlaylistMySuffix[]) => (this.playlists = resBody));

      this.albumService
        .query()
        .pipe(
          map((res: HttpResponse<IAlbumMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAlbumMySuffix[]) => (this.albums = resBody));

      this.favoriteService
        .query()
        .pipe(
          map((res: HttpResponse<IFavoriteMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IFavoriteMySuffix[]) => (this.favorites = resBody));
    });
  }

  updateForm(songs: ISongsMySuffix): void {
    this.editForm.patchValue({
      id: songs.id,
      title: songs.title,
      genre: songs.genre,
      vocal: songs.vocal,
      country: songs.country,
      description: songs.description,
      songAddress: songs.songAddress,
      lyric: songs.lyric,
      avatar: songs.avatar,
      listenCount: songs.listenCount,
      favoriteCount: songs.favoriteCount,
      adsId: songs.adsId,
      playlistId: songs.playlistId,
      albumId: songs.albumId,
      favoriteId: songs.favoriteId
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('musicApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const songs = this.createFromForm();
    if (songs.id !== undefined) {
      this.subscribeToSaveResponse(this.songsService.update(songs));
    } else {
      this.subscribeToSaveResponse(this.songsService.create(songs));
    }
  }

  private createFromForm(): ISongsMySuffix {
    return {
      ...new SongsMySuffix(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      genre: this.editForm.get(['genre'])!.value,
      vocal: this.editForm.get(['vocal'])!.value,
      country: this.editForm.get(['country'])!.value,
      description: this.editForm.get(['description'])!.value,
      songAddress: this.editForm.get(['songAddress'])!.value,
      lyric: this.editForm.get(['lyric'])!.value,
      avatar: this.editForm.get(['avatar'])!.value,
      listenCount: this.editForm.get(['listenCount'])!.value,
      favoriteCount: this.editForm.get(['favoriteCount'])!.value,
      adsId: this.editForm.get(['adsId'])!.value,
      playlistId: this.editForm.get(['playlistId'])!.value,
      albumId: this.editForm.get(['albumId'])!.value,
      favoriteId: this.editForm.get(['favoriteId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISongsMySuffix>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
