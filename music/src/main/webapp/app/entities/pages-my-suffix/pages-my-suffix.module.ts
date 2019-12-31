import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MusicSharedModule } from 'app/shared/shared.module';
import { PagesMySuffixComponent } from './pages-my-suffix.component';
import { PagesMySuffixDetailComponent } from './pages-my-suffix-detail.component';
import { PagesMySuffixUpdateComponent } from './pages-my-suffix-update.component';
import { PagesMySuffixDeleteDialogComponent } from './pages-my-suffix-delete-dialog.component';
import { pagesRoute } from './pages-my-suffix.route';

@NgModule({
  imports: [MusicSharedModule, RouterModule.forChild(pagesRoute)],
  declarations: [PagesMySuffixComponent, PagesMySuffixDetailComponent, PagesMySuffixUpdateComponent, PagesMySuffixDeleteDialogComponent],
  entryComponents: [PagesMySuffixDeleteDialogComponent]
})
export class MusicPagesMySuffixModule {}
