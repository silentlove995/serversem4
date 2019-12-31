import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlaylistMySuffix, PlaylistMySuffix } from 'app/shared/model/playlist-my-suffix.model';
import { PlaylistMySuffixService } from './playlist-my-suffix.service';
import { PlaylistMySuffixComponent } from './playlist-my-suffix.component';
import { PlaylistMySuffixDetailComponent } from './playlist-my-suffix-detail.component';
import { PlaylistMySuffixUpdateComponent } from './playlist-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class PlaylistMySuffixResolve implements Resolve<IPlaylistMySuffix> {
  constructor(private service: PlaylistMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlaylistMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((playlist: HttpResponse<PlaylistMySuffix>) => {
          if (playlist.body) {
            return of(playlist.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PlaylistMySuffix());
  }
}

export const playlistRoute: Routes = [
  {
    path: '',
    component: PlaylistMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'musicApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaylistMySuffixDetailComponent,
    resolve: {
      playlist: PlaylistMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaylistMySuffixUpdateComponent,
    resolve: {
      playlist: PlaylistMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaylistMySuffixUpdateComponent,
    resolve: {
      playlist: PlaylistMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
