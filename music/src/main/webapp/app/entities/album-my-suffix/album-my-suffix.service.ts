import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IAlbumMySuffix } from 'app/shared/model/album-my-suffix.model';

type EntityResponseType = HttpResponse<IAlbumMySuffix>;
type EntityArrayResponseType = HttpResponse<IAlbumMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class AlbumMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/albums';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/albums';

  constructor(protected http: HttpClient) {}

  create(album: IAlbumMySuffix): Observable<EntityResponseType> {
    return this.http.post<IAlbumMySuffix>(this.resourceUrl, album, { observe: 'response' });
  }

  update(album: IAlbumMySuffix): Observable<EntityResponseType> {
    return this.http.put<IAlbumMySuffix>(this.resourceUrl, album, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlbumMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlbumMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlbumMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
