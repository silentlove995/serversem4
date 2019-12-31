import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentMySuffix } from 'app/shared/model/payment-my-suffix.model';

@Component({
  selector: 'jhi-payment-my-suffix-detail',
  templateUrl: './payment-my-suffix-detail.component.html'
})
export class PaymentMySuffixDetailComponent implements OnInit {
  payment: IPaymentMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ payment }) => {
      this.payment = payment;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
