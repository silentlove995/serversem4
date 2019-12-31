import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPagesMySuffix, PagesMySuffix } from 'app/shared/model/pages-my-suffix.model';
import { PagesMySuffixService } from './pages-my-suffix.service';
import { PagesMySuffixComponent } from './pages-my-suffix.component';
import { PagesMySuffixDetailComponent } from './pages-my-suffix-detail.component';
import { PagesMySuffixUpdateComponent } from './pages-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class PagesMySuffixResolve implements Resolve<IPagesMySuffix> {
  constructor(private service: PagesMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPagesMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pages: HttpResponse<PagesMySuffix>) => {
          if (pages.body) {
            return of(pages.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PagesMySuffix());
  }
}

export const pagesRoute: Routes = [
  {
    path: '',
    component: PagesMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'musicApp.pages.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PagesMySuffixDetailComponent,
    resolve: {
      pages: PagesMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.pages.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PagesMySuffixUpdateComponent,
    resolve: {
      pages: PagesMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.pages.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PagesMySuffixUpdateComponent,
    resolve: {
      pages: PagesMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.pages.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
