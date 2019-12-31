import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPaymentMySuffix, PaymentMySuffix } from 'app/shared/model/payment-my-suffix.model';
import { PaymentMySuffixService } from './payment-my-suffix.service';
import { PaymentMySuffixComponent } from './payment-my-suffix.component';
import { PaymentMySuffixDetailComponent } from './payment-my-suffix-detail.component';
import { PaymentMySuffixUpdateComponent } from './payment-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class PaymentMySuffixResolve implements Resolve<IPaymentMySuffix> {
  constructor(private service: PaymentMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaymentMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((payment: HttpResponse<PaymentMySuffix>) => {
          if (payment.body) {
            return of(payment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PaymentMySuffix());
  }
}

export const paymentRoute: Routes = [
  {
    path: '',
    component: PaymentMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.payment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PaymentMySuffixDetailComponent,
    resolve: {
      payment: PaymentMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.payment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PaymentMySuffixUpdateComponent,
    resolve: {
      payment: PaymentMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.payment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PaymentMySuffixUpdateComponent,
    resolve: {
      payment: PaymentMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.payment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
