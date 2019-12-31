import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFavoriteMySuffix } from 'app/shared/model/favorite-my-suffix.model';

@Component({
  selector: 'jhi-favorite-my-suffix-detail',
  templateUrl: './favorite-my-suffix-detail.component.html'
})
export class FavoriteMySuffixDetailComponent implements OnInit {
  favorite: IFavoriteMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ favorite }) => {
      this.favorite = favorite;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
