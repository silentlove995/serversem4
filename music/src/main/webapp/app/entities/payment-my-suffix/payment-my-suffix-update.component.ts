import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPaymentMySuffix, PaymentMySuffix } from 'app/shared/model/payment-my-suffix.model';
import { PaymentMySuffixService } from './payment-my-suffix.service';

@Component({
  selector: 'jhi-payment-my-suffix-update',
  templateUrl: './payment-my-suffix-update.component.html'
})
export class PaymentMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    userActive: []
  });

  constructor(protected paymentService: PaymentMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ payment }) => {
      this.updateForm(payment);
    });
  }

  updateForm(payment: IPaymentMySuffix): void {
    this.editForm.patchValue({
      id: payment.id,
      userActive: payment.userActive
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const payment = this.createFromForm();
    if (payment.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentService.update(payment));
    } else {
      this.subscribeToSaveResponse(this.paymentService.create(payment));
    }
  }

  private createFromForm(): IPaymentMySuffix {
    return {
      ...new PaymentMySuffix(),
      id: this.editForm.get(['id'])!.value,
      userActive: this.editForm.get(['userActive'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
