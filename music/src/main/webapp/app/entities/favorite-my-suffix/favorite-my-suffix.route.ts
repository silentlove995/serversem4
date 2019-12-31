import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFavoriteMySuffix, FavoriteMySuffix } from 'app/shared/model/favorite-my-suffix.model';
import { FavoriteMySuffixService } from './favorite-my-suffix.service';
import { FavoriteMySuffixComponent } from './favorite-my-suffix.component';
import { FavoriteMySuffixDetailComponent } from './favorite-my-suffix-detail.component';
import { FavoriteMySuffixUpdateComponent } from './favorite-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class FavoriteMySuffixResolve implements Resolve<IFavoriteMySuffix> {
  constructor(private service: FavoriteMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFavoriteMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((favorite: HttpResponse<FavoriteMySuffix>) => {
          if (favorite.body) {
            return of(favorite.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FavoriteMySuffix());
  }
}

export const favoriteRoute: Routes = [
  {
    path: '',
    component: FavoriteMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'musicApp.favorite.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FavoriteMySuffixDetailComponent,
    resolve: {
      favorite: FavoriteMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.favorite.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FavoriteMySuffixUpdateComponent,
    resolve: {
      favorite: FavoriteMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.favorite.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FavoriteMySuffixUpdateComponent,
    resolve: {
      favorite: FavoriteMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.favorite.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
