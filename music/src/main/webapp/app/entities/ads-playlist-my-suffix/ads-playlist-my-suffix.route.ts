import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdsPlaylistMySuffix, AdsPlaylistMySuffix } from 'app/shared/model/ads-playlist-my-suffix.model';
import { AdsPlaylistMySuffixService } from './ads-playlist-my-suffix.service';
import { AdsPlaylistMySuffixComponent } from './ads-playlist-my-suffix.component';
import { AdsPlaylistMySuffixDetailComponent } from './ads-playlist-my-suffix-detail.component';
import { AdsPlaylistMySuffixUpdateComponent } from './ads-playlist-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class AdsPlaylistMySuffixResolve implements Resolve<IAdsPlaylistMySuffix> {
  constructor(private service: AdsPlaylistMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdsPlaylistMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adsPlaylist: HttpResponse<AdsPlaylistMySuffix>) => {
          if (adsPlaylist.body) {
            return of(adsPlaylist.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdsPlaylistMySuffix());
  }
}

export const adsPlaylistRoute: Routes = [
  {
    path: '',
    component: AdsPlaylistMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'musicApp.adsPlaylist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdsPlaylistMySuffixDetailComponent,
    resolve: {
      adsPlaylist: AdsPlaylistMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.adsPlaylist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdsPlaylistMySuffixUpdateComponent,
    resolve: {
      adsPlaylist: AdsPlaylistMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.adsPlaylist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdsPlaylistMySuffixUpdateComponent,
    resolve: {
      adsPlaylist: AdsPlaylistMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.adsPlaylist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
