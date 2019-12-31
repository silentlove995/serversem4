import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IPagesMySuffix } from 'app/shared/model/pages-my-suffix.model';

type EntityResponseType = HttpResponse<IPagesMySuffix>;
type EntityArrayResponseType = HttpResponse<IPagesMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PagesMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/pages';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/pages';

  constructor(protected http: HttpClient) {}

  create(pages: IPagesMySuffix): Observable<EntityResponseType> {
    return this.http.post<IPagesMySuffix>(this.resourceUrl, pages, { observe: 'response' });
  }

  update(pages: IPagesMySuffix): Observable<EntityResponseType> {
    return this.http.put<IPagesMySuffix>(this.resourceUrl, pages, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPagesMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagesMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagesMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
