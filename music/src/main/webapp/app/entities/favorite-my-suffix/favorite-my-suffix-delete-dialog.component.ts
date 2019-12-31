import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFavoriteMySuffix } from 'app/shared/model/favorite-my-suffix.model';
import { FavoriteMySuffixService } from './favorite-my-suffix.service';

@Component({
  templateUrl: './favorite-my-suffix-delete-dialog.component.html'
})
export class FavoriteMySuffixDeleteDialogComponent {
  favorite?: IFavoriteMySuffix;

  constructor(
    protected favoriteService: FavoriteMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.favoriteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('favoriteListModification');
      this.activeModal.close();
    });
  }
}
