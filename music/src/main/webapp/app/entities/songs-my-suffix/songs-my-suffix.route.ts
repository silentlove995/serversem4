import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISongsMySuffix, SongsMySuffix } from 'app/shared/model/songs-my-suffix.model';
import { SongsMySuffixService } from './songs-my-suffix.service';
import { SongsMySuffixComponent } from './songs-my-suffix.component';
import { SongsMySuffixDetailComponent } from './songs-my-suffix-detail.component';
import { SongsMySuffixUpdateComponent } from './songs-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class SongsMySuffixResolve implements Resolve<ISongsMySuffix> {
  constructor(private service: SongsMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISongsMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((songs: HttpResponse<SongsMySuffix>) => {
          if (songs.body) {
            return of(songs.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SongsMySuffix());
  }
}

export const songsRoute: Routes = [
  {
    path: '',
    component: SongsMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'musicApp.songs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SongsMySuffixDetailComponent,
    resolve: {
      songs: SongsMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.songs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SongsMySuffixUpdateComponent,
    resolve: {
      songs: SongsMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.songs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SongsMySuffixUpdateComponent,
    resolve: {
      songs: SongsMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.songs.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
