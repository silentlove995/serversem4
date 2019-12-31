import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IAdsPlaylistMySuffix } from 'app/shared/model/ads-playlist-my-suffix.model';

type EntityResponseType = HttpResponse<IAdsPlaylistMySuffix>;
type EntityArrayResponseType = HttpResponse<IAdsPlaylistMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class AdsPlaylistMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/ads-playlists';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/ads-playlists';

  constructor(protected http: HttpClient) {}

  create(adsPlaylist: IAdsPlaylistMySuffix): Observable<EntityResponseType> {
    return this.http.post<IAdsPlaylistMySuffix>(this.resourceUrl, adsPlaylist, { observe: 'response' });
  }

  update(adsPlaylist: IAdsPlaylistMySuffix): Observable<EntityResponseType> {
    return this.http.put<IAdsPlaylistMySuffix>(this.resourceUrl, adsPlaylist, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAdsPlaylistMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdsPlaylistMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdsPlaylistMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
