import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaymentMySuffix } from 'app/shared/model/payment-my-suffix.model';
import { PaymentMySuffixService } from './payment-my-suffix.service';
import { PaymentMySuffixDeleteDialogComponent } from './payment-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-payment-my-suffix',
  templateUrl: './payment-my-suffix.component.html'
})
export class PaymentMySuffixComponent implements OnInit, OnDestroy {
  payments?: IPaymentMySuffix[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected paymentService: PaymentMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.paymentService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IPaymentMySuffix[]>) => (this.payments = res.body ? res.body : []));
      return;
    }
    this.paymentService.query().subscribe((res: HttpResponse<IPaymentMySuffix[]>) => {
      this.payments = res.body ? res.body : [];
      this.currentSearch = '';
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPayments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPaymentMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPayments(): void {
    this.eventSubscriber = this.eventManager.subscribe('paymentListModification', () => this.loadAll());
  }

  delete(payment: IPaymentMySuffix): void {
    const modalRef = this.modalService.open(PaymentMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.payment = payment;
  }
}
