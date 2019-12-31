import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdsSongMySuffix } from 'app/shared/model/ads-song-my-suffix.model';
import { AdsSongMySuffixService } from './ads-song-my-suffix.service';

@Component({
  templateUrl: './ads-song-my-suffix-delete-dialog.component.html'
})
export class AdsSongMySuffixDeleteDialogComponent {
  adsSong?: IAdsSongMySuffix;

  constructor(
    protected adsSongService: AdsSongMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.adsSongService.delete(id).subscribe(() => {
      this.eventManager.broadcast('adsSongListModification');
      this.activeModal.close();
    });
  }
}
