import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPostsMySuffix, PostsMySuffix } from 'app/shared/model/posts-my-suffix.model';
import { PostsMySuffixService } from './posts-my-suffix.service';
import { PostsMySuffixComponent } from './posts-my-suffix.component';
import { PostsMySuffixDetailComponent } from './posts-my-suffix-detail.component';
import { PostsMySuffixUpdateComponent } from './posts-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class PostsMySuffixResolve implements Resolve<IPostsMySuffix> {
  constructor(private service: PostsMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPostsMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((posts: HttpResponse<PostsMySuffix>) => {
          if (posts.body) {
            return of(posts.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PostsMySuffix());
  }
}

export const postsRoute: Routes = [
  {
    path: '',
    component: PostsMySuffixComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'musicApp.posts.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PostsMySuffixDetailComponent,
    resolve: {
      posts: PostsMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.posts.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PostsMySuffixUpdateComponent,
    resolve: {
      posts: PostsMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.posts.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PostsMySuffixUpdateComponent,
    resolve: {
      posts: PostsMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'musicApp.posts.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
