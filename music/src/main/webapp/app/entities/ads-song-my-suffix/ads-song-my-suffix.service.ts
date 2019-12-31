import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IAdsSongMySuffix } from 'app/shared/model/ads-song-my-suffix.model';

type EntityResponseType = HttpResponse<IAdsSongMySuffix>;
type EntityArrayResponseType = HttpResponse<IAdsSongMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class AdsSongMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/ads-songs';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/ads-songs';

  constructor(protected http: HttpClient) {}

  create(adsSong: IAdsSongMySuffix): Observable<EntityResponseType> {
    return this.http.post<IAdsSongMySuffix>(this.resourceUrl, adsSong, { observe: 'response' });
  }

  update(adsSong: IAdsSongMySuffix): Observable<EntityResponseType> {
    return this.http.put<IAdsSongMySuffix>(this.resourceUrl, adsSong, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAdsSongMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdsSongMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdsSongMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
