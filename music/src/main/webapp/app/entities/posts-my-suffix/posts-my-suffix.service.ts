import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IPostsMySuffix } from 'app/shared/model/posts-my-suffix.model';

type EntityResponseType = HttpResponse<IPostsMySuffix>;
type EntityArrayResponseType = HttpResponse<IPostsMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PostsMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/posts';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/posts';

  constructor(protected http: HttpClient) {}

  create(posts: IPostsMySuffix): Observable<EntityResponseType> {
    return this.http.post<IPostsMySuffix>(this.resourceUrl, posts, { observe: 'response' });
  }

  update(posts: IPostsMySuffix): Observable<EntityResponseType> {
    return this.http.put<IPostsMySuffix>(this.resourceUrl, posts, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPostsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPostsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPostsMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
