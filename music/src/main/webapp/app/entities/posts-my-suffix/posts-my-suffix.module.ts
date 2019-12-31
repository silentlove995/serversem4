import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MusicSharedModule } from 'app/shared/shared.module';
import { PostsMySuffixComponent } from './posts-my-suffix.component';
import { PostsMySuffixDetailComponent } from './posts-my-suffix-detail.component';
import { PostsMySuffixUpdateComponent } from './posts-my-suffix-update.component';
import { PostsMySuffixDeleteDialogComponent } from './posts-my-suffix-delete-dialog.component';
import { postsRoute } from './posts-my-suffix.route';

@NgModule({
  imports: [MusicSharedModule, RouterModule.forChild(postsRoute)],
  declarations: [PostsMySuffixComponent, PostsMySuffixDetailComponent, PostsMySuffixUpdateComponent, PostsMySuffixDeleteDialogComponent],
  entryComponents: [PostsMySuffixDeleteDialogComponent]
})
export class MusicPostsMySuffixModule {}
