import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAdsSongMySuffix, AdsSongMySuffix } from 'app/shared/model/ads-song-my-suffix.model';
import { AdsSongMySuffixService } from './ads-song-my-suffix.service';

@Component({
  selector: 'jhi-ads-song-my-suffix-update',
  templateUrl: './ads-song-my-suffix-update.component.html'
})
export class AdsSongMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    content: [],
    image: [],
    songId: []
  });

  constructor(protected adsSongService: AdsSongMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adsSong }) => {
      this.updateForm(adsSong);
    });
  }

  updateForm(adsSong: IAdsSongMySuffix): void {
    this.editForm.patchValue({
      id: adsSong.id,
      content: adsSong.content,
      image: adsSong.image,
      songId: adsSong.songId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adsSong = this.createFromForm();
    if (adsSong.id !== undefined) {
      this.subscribeToSaveResponse(this.adsSongService.update(adsSong));
    } else {
      this.subscribeToSaveResponse(this.adsSongService.create(adsSong));
    }
  }

  private createFromForm(): IAdsSongMySuffix {
    return {
      ...new AdsSongMySuffix(),
      id: this.editForm.get(['id'])!.value,
      content: this.editForm.get(['content'])!.value,
      image: this.editForm.get(['image'])!.value,
      songId: this.editForm.get(['songId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdsSongMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
