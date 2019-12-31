import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdsSongMySuffix } from 'app/shared/model/ads-song-my-suffix.model';

@Component({
  selector: 'jhi-ads-song-my-suffix-detail',
  templateUrl: './ads-song-my-suffix-detail.component.html'
})
export class AdsSongMySuffixDetailComponent implements OnInit {
  adsSong: IAdsSongMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adsSong }) => {
      this.adsSong = adsSong;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
