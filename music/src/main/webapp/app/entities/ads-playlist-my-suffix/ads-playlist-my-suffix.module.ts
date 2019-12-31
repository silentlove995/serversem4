import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MusicSharedModule } from 'app/shared/shared.module';
import { AdsPlaylistMySuffixComponent } from './ads-playlist-my-suffix.component';
import { AdsPlaylistMySuffixDetailComponent } from './ads-playlist-my-suffix-detail.component';
import { AdsPlaylistMySuffixUpdateComponent } from './ads-playlist-my-suffix-update.component';
import { AdsPlaylistMySuffixDeleteDialogComponent } from './ads-playlist-my-suffix-delete-dialog.component';
import { adsPlaylistRoute } from './ads-playlist-my-suffix.route';

@NgModule({
  imports: [MusicSharedModule, RouterModule.forChild(adsPlaylistRoute)],
  declarations: [
    AdsPlaylistMySuffixComponent,
    AdsPlaylistMySuffixDetailComponent,
    AdsPlaylistMySuffixUpdateComponent,
    AdsPlaylistMySuffixDeleteDialogComponent
  ],
  entryComponents: [AdsPlaylistMySuffixDeleteDialogComponent]
})
export class MusicAdsPlaylistMySuffixModule {}
