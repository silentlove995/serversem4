import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { SongsMySuffixService } from 'app/entities/songs-my-suffix/songs-my-suffix.service';
import { ISongsMySuffix, SongsMySuffix } from 'app/shared/model/songs-my-suffix.model';
import { Genre } from 'app/shared/model/enumerations/genre.model';
import { Country } from 'app/shared/model/enumerations/country.model';

describe('Service Tests', () => {
  describe('SongsMySuffix Service', () => {
    let injector: TestBed;
    let service: SongsMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: ISongsMySuffix;
    let expectedResult: ISongsMySuffix | ISongsMySuffix[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SongsMySuffixService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new SongsMySuffix(
        0,
        'AAAAAAA',
        Genre.Drama,
        'AAAAAAA',
        Country.China,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SongsMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new SongsMySuffix())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SongsMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            genre: 'BBBBBB',
            vocal: 'BBBBBB',
            country: 'BBBBBB',
            description: 'BBBBBB',
            songAddress: 'BBBBBB',
            lyric: 'BBBBBB',
            avatar: 'BBBBBB',
            listenCount: 1,
            favoriteCount: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SongsMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            genre: 'BBBBBB',
            vocal: 'BBBBBB',
            country: 'BBBBBB',
            description: 'BBBBBB',
            songAddress: 'BBBBBB',
            lyric: 'BBBBBB',
            avatar: 'BBBBBB',
            listenCount: 1,
            favoriteCount: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SongsMySuffix', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
