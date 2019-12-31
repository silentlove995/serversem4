import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPostsMySuffix } from 'app/shared/model/posts-my-suffix.model';

@Component({
  selector: 'jhi-posts-my-suffix-detail',
  templateUrl: './posts-my-suffix-detail.component.html'
})
export class PostsMySuffixDetailComponent implements OnInit {
  posts: IPostsMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ posts }) => {
      this.posts = posts;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
