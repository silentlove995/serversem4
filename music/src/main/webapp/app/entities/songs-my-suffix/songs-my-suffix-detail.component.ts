import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISongsMySuffix } from 'app/shared/model/songs-my-suffix.model';

@Component({
  selector: 'jhi-songs-my-suffix-detail',
  templateUrl: './songs-my-suffix-detail.component.html'
})
export class SongsMySuffixDetailComponent implements OnInit {
  songs: ISongsMySuffix | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ songs }) => {
      this.songs = songs;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
