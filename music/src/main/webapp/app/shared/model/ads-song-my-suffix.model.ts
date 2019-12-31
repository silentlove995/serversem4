export interface IAdsSongMySuffix {
  id?: number;
  content?: string;
  image?: string;
  songId?: number;
}

export class AdsSongMySuffix implements IAdsSongMySuffix {
  constructor(public id?: number, public content?: string, public image?: string, public songId?: number) {}
}
