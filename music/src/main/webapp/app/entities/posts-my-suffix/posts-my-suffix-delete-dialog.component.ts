import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPostsMySuffix } from 'app/shared/model/posts-my-suffix.model';
import { PostsMySuffixService } from './posts-my-suffix.service';

@Component({
  templateUrl: './posts-my-suffix-delete-dialog.component.html'
})
export class PostsMySuffixDeleteDialogComponent {
  posts?: IPostsMySuffix;

  constructor(protected postsService: PostsMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.postsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('postsListModification');
      this.activeModal.close();
    });
  }
}
