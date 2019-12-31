import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MusicSharedModule } from 'app/shared/shared.module';
import { PaymentMySuffixComponent } from './payment-my-suffix.component';
import { PaymentMySuffixDetailComponent } from './payment-my-suffix-detail.component';
import { PaymentMySuffixUpdateComponent } from './payment-my-suffix-update.component';
import { PaymentMySuffixDeleteDialogComponent } from './payment-my-suffix-delete-dialog.component';
import { paymentRoute } from './payment-my-suffix.route';

@NgModule({
  imports: [MusicSharedModule, RouterModule.forChild(paymentRoute)],
  declarations: [
    PaymentMySuffixComponent,
    PaymentMySuffixDetailComponent,
    PaymentMySuffixUpdateComponent,
    PaymentMySuffixDeleteDialogComponent
  ],
  entryComponents: [PaymentMySuffixDeleteDialogComponent]
})
export class MusicPaymentMySuffixModule {}
