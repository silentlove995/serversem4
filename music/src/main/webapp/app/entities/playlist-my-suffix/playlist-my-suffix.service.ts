import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IPlaylistMySuffix } from 'app/shared/model/playlist-my-suffix.model';

type EntityResponseType = HttpResponse<IPlaylistMySuffix>;
type EntityArrayResponseType = HttpResponse<IPlaylistMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PlaylistMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/playlists';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/playlists';

  constructor(protected http: HttpClient) {}

  create(playlist: IPlaylistMySuffix): Observable<EntityResponseType> {
    return this.http.post<IPlaylistMySuffix>(this.resourceUrl, playlist, { observe: 'response' });
  }

  update(playlist: IPlaylistMySuffix): Observable<EntityResponseType> {
    return this.http.put<IPlaylistMySuffix>(this.resourceUrl, playlist, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaylistMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaylistMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaylistMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
