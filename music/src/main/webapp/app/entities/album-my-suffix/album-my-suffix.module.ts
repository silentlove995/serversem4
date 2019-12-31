import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MusicSharedModule } from 'app/shared/shared.module';
import { AlbumMySuffixComponent } from './album-my-suffix.component';
import { AlbumMySuffixDetailComponent } from './album-my-suffix-detail.component';
import { AlbumMySuffixUpdateComponent } from './album-my-suffix-update.component';
import { AlbumMySuffixDeleteDialogComponent } from './album-my-suffix-delete-dialog.component';
import { albumRoute } from './album-my-suffix.route';

@NgModule({
  imports: [MusicSharedModule, RouterModule.forChild(albumRoute)],
  declarations: [AlbumMySuffixComponent, AlbumMySuffixDetailComponent, AlbumMySuffixUpdateComponent, AlbumMySuffixDeleteDialogComponent],
  entryComponents: [AlbumMySuffixDeleteDialogComponent]
})
export class MusicAlbumMySuffixModule {}
