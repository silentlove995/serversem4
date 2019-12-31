import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaylistMySuffix } from 'app/shared/model/playlist-my-suffix.model';
import { PlaylistMySuffixService } from './playlist-my-suffix.service';

@Component({
  templateUrl: './playlist-my-suffix-delete-dialog.component.html'
})
export class PlaylistMySuffixDeleteDialogComponent {
  playlist?: IPlaylistMySuffix;

  constructor(
    protected playlistService: PlaylistMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.playlistService.delete(id).subscribe(() => {
      this.eventManager.broadcast('playlistListModification');
      this.activeModal.close();
    });
  }
}
