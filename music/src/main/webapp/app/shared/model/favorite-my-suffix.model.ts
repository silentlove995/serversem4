import { ISongsMySuffix } from 'app/shared/model/songs-my-suffix.model';

export interface IFavoriteMySuffix {
  id?: number;
  user?: string;
  song?: string;
  songs?: ISongsMySuffix[];
}

export class FavoriteMySuffix implements IFavoriteMySuffix {
  constructor(public id?: number, public user?: string, public song?: string, public songs?: ISongsMySuffix[]) {}
}
