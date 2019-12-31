import { IPostsMySuffix } from 'app/shared/model/posts-my-suffix.model';

export interface IPagesMySuffix {
  id?: number;
  name?: string;
  avatar?: string;
  idol?: string;
  titles?: IPostsMySuffix[];
}

export class PagesMySuffix implements IPagesMySuffix {
  constructor(public id?: number, public name?: string, public avatar?: string, public idol?: string, public titles?: IPostsMySuffix[]) {}
}
