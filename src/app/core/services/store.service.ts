import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListSearchProperty} from '../models/list-search-property';
import {ListItem} from '../models/list-item';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient) {
  }

  getBots(search: ListSearchProperty): Observable<ListItem[]> {
    return this.http.get<ListItem[]>('./assets/data.json', {
      params: new HttpParams()
        .set('number', search.number)
        .set('shelf', search.shelf)
        .set('sortOrder', search.sortOrder)
        .set('sortActive', search.sortActive)
        .set('pageNumber', search.pageNumber.toString())
        .set('pageSize', search.pageSize.toString())
    }).pipe((res) => {
      return res;
    });
  }
}
