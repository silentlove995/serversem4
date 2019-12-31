import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAlbumMySuffix, AlbumMySuffix } from 'app/shared/model/album-my-suffix.model';
import { AlbumMySuffixService } from './album-my-suffix.service';
import { AlbumMySuffixComponent } from './album-my-suffix.component';
import { AlbumMySuffixDetailComponent } from './album-my-suffix-detail.component';
import { AlbumMySuffixUpdateComponent } from './album-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class AlbumMySuffixResolve implements Resolve<IAlbumMySuffix> {
  constructor(private service: AlbumMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlbumMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((album: HttpResponse<AlbumMySuffix>) => {
          if (album.body) {
            return of(album.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AlbumMySuffix());
  }
}

export const albumRoute: Routes = [
  {
    path: '',
    component: AlbumMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'musicApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AlbumMySuffixDetailComponent,
    resolve: {
      album: AlbumMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AlbumMySuffixUpdateComponent,
    resolve: {
      album: AlbumMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AlbumMySuffixUpdateComponent,
    resolve: {
      album: AlbumMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
