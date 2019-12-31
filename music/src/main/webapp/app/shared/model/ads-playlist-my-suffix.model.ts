export interface IAdsPlaylistMySuffix {
  id?: number;
  content?: string;
  image?: string;
  playlistId?: number;
}

export class AdsPlaylistMySuffix implements IAdsPlaylistMySuffix {
  constructor(public id?: number, public content?: string, public image?: string, public playlistId?: number) {}
}
