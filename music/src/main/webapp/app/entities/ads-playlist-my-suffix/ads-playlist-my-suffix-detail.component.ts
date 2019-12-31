import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdsPlaylistMySuffix } from 'app/shared/model/ads-playlist-my-suffix.model';

@Component({
  selector: 'jhi-ads-playlist-my-suffix-detail',
  templateUrl: './ads-playlist-my-suffix-detail.component.html'
})
export class AdsPlaylistMySuffixDetailComponent implements OnInit {
  adsPlaylist: IAdsPlaylistMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adsPlaylist }) => {
      this.adsPlaylist = adsPlaylist;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
