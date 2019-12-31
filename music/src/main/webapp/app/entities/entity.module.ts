import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'payment-my-suffix',
        loadChildren: () => import('./payment-my-suffix/payment-my-suffix.module').then(m => m.MusicPaymentMySuffixModule)
      },
      {
        path: 'songs-my-suffix',
        loadChildren: () => import('./songs-my-suffix/songs-my-suffix.module').then(m => m.MusicSongsMySuffixModule)
      },
      {
        path: 'posts-my-suffix',
        loadChildren: () => import('./posts-my-suffix/posts-my-suffix.module').then(m => m.MusicPostsMySuffixModule)
      },
      {
        path: 'pages-my-suffix',
        loadChildren: () => import('./pages-my-suffix/pages-my-suffix.module').then(m => m.MusicPagesMySuffixModule)
      },
      {
        path: 'album-my-suffix',
        loadChildren: () => import('./album-my-suffix/album-my-suffix.module').then(m => m.MusicAlbumMySuffixModule)
      },
      {
        path: 'playlist-my-suffix',
        loadChildren: () => import('./playlist-my-suffix/playlist-my-suffix.module').then(m => m.MusicPlaylistMySuffixModule)
      },
      {
        path: 'ads-song-my-suffix',
        loadChildren: () => import('./ads-song-my-suffix/ads-song-my-suffix.module').then(m => m.MusicAdsSongMySuffixModule)
      },
      {
        path: 'ads-playlist-my-suffix',
        loadChildren: () => import('./ads-playlist-my-suffix/ads-playlist-my-suffix.module').then(m => m.MusicAdsPlaylistMySuffixModule)
      },
      {
        path: 'favorite-my-suffix',
        loadChildren: () => import('./favorite-my-suffix/favorite-my-suffix.module').then(m => m.MusicFavoriteMySuffixModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MusicEntityModule {}
