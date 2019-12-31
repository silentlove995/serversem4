import { ISongsMySuffix } from 'app/shared/model/songs-my-suffix.model';

export interface IAlbumMySuffix {
  id?: number;
  title?: string;
  description?: string;
  vocal?: string;
  thumbnail?: string;
  songs?: ISongsMySuffix[];
}

export class AlbumMySuffix implements IAlbumMySuffix {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public vocal?: string,
    public thumbnail?: string,
    public songs?: ISongsMySuffix[]
  ) {}
}
