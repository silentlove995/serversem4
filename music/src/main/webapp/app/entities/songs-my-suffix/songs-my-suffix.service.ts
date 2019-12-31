import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ISongsMySuffix } from 'app/shared/model/songs-my-suffix.model';

type EntityResponseType = HttpResponse<ISongsMySuffix>;
type EntityArrayResponseType = HttpResponse<ISongsMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SongsMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/songs';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/songs';

  constructor(protected http: HttpClient) {}

  create(songs: ISongsMySuffix): Observable<EntityResponseType> {
    return this.http.post<ISongsMySuffix>(this.resourceUrl, songs, { observe: 'response' });
  }

  update(songs: ISongsMySuffix): Observable<EntityResponseType> {
    return this.http.put<ISongsMySuffix>(this.resourceUrl, songs, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISongsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISongsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISongsMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
