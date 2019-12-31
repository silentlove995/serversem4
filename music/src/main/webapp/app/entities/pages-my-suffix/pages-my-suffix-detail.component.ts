import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagesMySuffix } from 'app/shared/model/pages-my-suffix.model';

@Component({
  selector: 'jhi-pages-my-suffix-detail',
  templateUrl: './pages-my-suffix-detail.component.html'
})
export class PagesMySuffixDetailComponent implements OnInit {
  pages: IPagesMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pages }) => {
      this.pages = pages;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
