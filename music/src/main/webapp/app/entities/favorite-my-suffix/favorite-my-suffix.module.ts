import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MusicSharedModule } from 'app/shared/shared.module';
import { FavoriteMySuffixComponent } from './favorite-my-suffix.component';
import { FavoriteMySuffixDetailComponent } from './favorite-my-suffix-detail.component';
import { FavoriteMySuffixUpdateComponent } from './favorite-my-suffix-update.component';
import { FavoriteMySuffixDeleteDialogComponent } from './favorite-my-suffix-delete-dialog.component';
import { favoriteRoute } from './favorite-my-suffix.route';

@NgModule({
  imports: [MusicSharedModule, RouterModule.forChild(favoriteRoute)],
  declarations: [
    FavoriteMySuffixComponent,
    FavoriteMySuffixDetailComponent,
    FavoriteMySuffixUpdateComponent,
    FavoriteMySuffixDeleteDialogComponent
  ],
  entryComponents: [FavoriteMySuffixDeleteDialogComponent]
})
export class MusicFavoriteMySuffixModule {}
