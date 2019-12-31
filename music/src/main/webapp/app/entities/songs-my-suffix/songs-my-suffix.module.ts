import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MusicSharedModule } from 'app/shared/shared.module';
import { SongsMySuffixComponent } from './songs-my-suffix.component';
import { SongsMySuffixDetailComponent } from './songs-my-suffix-detail.component';
import { SongsMySuffixUpdateComponent } from './songs-my-suffix-update.component';
import { SongsMySuffixDeleteDialogComponent } from './songs-my-suffix-delete-dialog.component';
import { songsRoute } from './songs-my-suffix.route';

@NgModule({
  imports: [MusicSharedModule, RouterModule.forChild(songsRoute)],
  declarations: [SongsMySuffixComponent, SongsMySuffixDetailComponent, SongsMySuffixUpdateComponent, SongsMySuffixDeleteDialogComponent],
  entryComponents: [SongsMySuffixDeleteDialogComponent]
})
export class MusicSongsMySuffixModule {}
