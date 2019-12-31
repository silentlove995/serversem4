import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlbumMySuffix } from 'app/shared/model/album-my-suffix.model';
import { AlbumMySuffixService } from './album-my-suffix.service';

@Component({
  templateUrl: './album-my-suffix-delete-dialog.component.html'
})
export class AlbumMySuffixDeleteDialogComponent {
  album?: IAlbumMySuffix;

  constructor(protected albumService: AlbumMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.albumService.delete(id).subscribe(() => {
      this.eventManager.broadcast('albumListModification');
      this.activeModal.close();
    });
  }
}
