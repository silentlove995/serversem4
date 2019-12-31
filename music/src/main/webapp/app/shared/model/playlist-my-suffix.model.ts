import { ISongsMySuffix } from 'app/shared/model/songs-my-suffix.model';

export interface IPlaylistMySuffix {
  id?: number;
  title?: string;
  description?: string;
  vocal?: string;
  thumbnail?: string;
  adsId?: number;
  songs?: ISongsMySuffix[];
}

export class PlaylistMySuffix implements IPlaylistMySuffix {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public vocal?: string,
    public thumbnail?: string,
    public adsId?: number,
    public songs?: ISongsMySuffix[]
  ) {}
}
