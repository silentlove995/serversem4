import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdsPlaylistMySuffix } from 'app/shared/model/ads-playlist-my-suffix.model';
import { AdsPlaylistMySuffixService } from './ads-playlist-my-suffix.service';

@Component({
  templateUrl: './ads-playlist-my-suffix-delete-dialog.component.html'
})
export class AdsPlaylistMySuffixDeleteDialogComponent {
  adsPlaylist?: IAdsPlaylistMySuffix;

  constructor(
    protected adsPlaylistService: AdsPlaylistMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.adsPlaylistService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adsPlaylistListModification');
      this.activeModal.close();
    });
  }
}
