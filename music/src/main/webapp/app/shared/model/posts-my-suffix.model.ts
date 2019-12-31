export interface IPostsMySuffix {
  id?: number;
  title?: string;
  content?: string;
  comment?: string;
  image?: string;
  like?: number;
  songAddress?: string;
  pagesId?: number;
}

export class PostsMySuffix implements IPostsMySuffix {
  constructor(
    public id?: number,
    public title?: string,
    public content?: string,
    public comment?: string,
    public image?: string,
    public like?: number,
    public songAddress?: string,
    public pagesId?: number
  ) {}
}
