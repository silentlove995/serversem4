import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdsSongMySuffix, AdsSongMySuffix } from 'app/shared/model/ads-song-my-suffix.model';
import { AdsSongMySuffixService } from './ads-song-my-suffix.service';
import { AdsSongMySuffixComponent } from './ads-song-my-suffix.component';
import { AdsSongMySuffixDetailComponent } from './ads-song-my-suffix-detail.component';
import { AdsSongMySuffixUpdateComponent } from './ads-song-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class AdsSongMySuffixResolve implements Resolve<IAdsSongMySuffix> {
  constructor(private service: AdsSongMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdsSongMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adsSong: HttpResponse<AdsSongMySuffix>) => {
          if (adsSong.body) {
            return of(adsSong.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdsSongMySuffix());
  }
}

export const adsSongRoute: Routes = [
  {
    path: '',
    component: AdsSongMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'musicApp.adsSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdsSongMySuffixDetailComponent,
    resolve: {
      adsSong: AdsSongMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.adsSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdsSongMySuffixUpdateComponent,
    resolve: {
      adsSong: AdsSongMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.adsSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdsSongMySuffixUpdateComponent,
    resolve: {
      adsSong: AdsSongMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.adsSong.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
