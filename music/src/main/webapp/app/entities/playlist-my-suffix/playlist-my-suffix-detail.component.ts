import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlaylistMySuffix } from 'app/shared/model/playlist-my-suffix.model';

@Component({
  selector: 'jhi-playlist-my-suffix-detail',
  templateUrl: './playlist-my-suffix-detail.component.html'
})
export class PlaylistMySuffixDetailComponent implements OnInit {
  playlist: IPlaylistMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.playlist = playlist;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
