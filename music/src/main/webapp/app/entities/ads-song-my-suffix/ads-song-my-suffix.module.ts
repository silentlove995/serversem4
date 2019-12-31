import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MusicSharedModule } from 'app/shared/shared.module';
import { AdsSongMySuffixComponent } from './ads-song-my-suffix.component';
import { AdsSongMySuffixDetailComponent } from './ads-song-my-suffix-detail.component';
import { AdsSongMySuffixUpdateComponent } from './ads-song-my-suffix-update.component';
import { AdsSongMySuffixDeleteDialogComponent } from './ads-song-my-suffix-delete-dialog.component';
import { adsSongRoute } from './ads-song-my-suffix.route';

@NgModule({
  imports: [MusicSharedModule, RouterModule.forChild(adsSongRoute)],
  declarations: [
    AdsSongMySuffixComponent,
    AdsSongMySuffixDetailComponent,
    AdsSongMySuffixUpdateComponent,
    AdsSongMySuffixDeleteDialogComponent
  ],
  entryComponents: [AdsSongMySuffixDeleteDialogComponent]
})
export class MusicAdsSongMySuffixModule {}
