import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISongsMySuffix } from 'app/shared/model/songs-my-suffix.model';
import { SongsMySuffixService } from './songs-my-suffix.service';

@Component({
  templateUrl: './songs-my-suffix-delete-dialog.component.html'
})
export class SongsMySuffixDeleteDialogComponent {
  songs?: ISongsMySuffix;

  constructor(protected songsService: SongsMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.songsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('songsListModification');
      this.activeModal.close();
    });
  }
}
