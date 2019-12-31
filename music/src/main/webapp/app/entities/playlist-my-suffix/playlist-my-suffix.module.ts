import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MusicSharedModule } from 'app/shared/shared.module';
import { PlaylistMySuffixComponent } from './playlist-my-suffix.component';
import { PlaylistMySuffixDetailComponent } from './playlist-my-suffix-detail.component';
import { PlaylistMySuffixUpdateComponent } from './playlist-my-suffix-update.component';
import { PlaylistMySuffixDeleteDialogComponent } from './playlist-my-suffix-delete-dialog.component';
import { playlistRoute } from './playlist-my-suffix.route';

@NgModule({
  imports: [MusicSharedModule, RouterModule.forChild(playlistRoute)],
  declarations: [
    PlaylistMySuffixComponent,
    PlaylistMySuffixDetailComponent,
    PlaylistMySuffixUpdateComponent,
    PlaylistMySuffixDeleteDialogComponent
  ],
  entryComponents: [PlaylistMySuffixDeleteDialogComponent]
})
export class MusicPlaylistMySuffixModule {}
