import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlbumMySuffix } from 'app/shared/model/album-my-suffix.model';

@Component({
  selector: 'jhi-album-my-suffix-detail',
  templateUrl: './album-my-suffix-detail.component.html'
})
export class AlbumMySuffixDetailComponent implements OnInit {
  album: IAlbumMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => {
      this.album = album;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
