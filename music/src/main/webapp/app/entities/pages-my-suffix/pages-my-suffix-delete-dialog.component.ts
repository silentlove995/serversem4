import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagesMySuffix } from 'app/shared/model/pages-my-suffix.model';
import { PagesMySuffixService } from './pages-my-suffix.service';

@Component({
  templateUrl: './pages-my-suffix-delete-dialog.component.html'
})
export class PagesMySuffixDeleteDialogComponent {
  pages?: IPagesMySuffix;

  constructor(protected pagesService: PagesMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pagesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pagesListModification');
      this.activeModal.close();
    });
  }
}
