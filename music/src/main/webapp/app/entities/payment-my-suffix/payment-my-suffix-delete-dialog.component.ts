import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentMySuffix } from 'app/shared/model/payment-my-suffix.model';
import { PaymentMySuffixService } from './payment-my-suffix.service';

@Component({
  templateUrl: './payment-my-suffix-delete-dialog.component.html'
})
export class PaymentMySuffixDeleteDialogComponent {
  payment?: IPaymentMySuffix;

  constructor(
    protected paymentService: PaymentMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paymentListModification');
      this.activeModal.close();
    });
  }
}
