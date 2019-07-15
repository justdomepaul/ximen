import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, BehaviorSubject, combineLatest} from 'rxjs';
import {ListSearchProperty} from '../models/list-search-property';
import {ListItem} from '../models/list-item';
import { AngularfirebaseService } from './angularfirebase.service';
import { switchMap } from 'rxjs/operators';

interface OrderBy {
  sortOrder: 'desc' | 'asc' | '';
  sortActive: string;
}

interface Pagination {
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  items$: Observable<ListItem[]>;
  numberFilter$: BehaviorSubject<string|null>;
  shelfFilter$: BehaviorSubject<string|null>;
  constructor(private http: HttpClient, private afService: AngularfirebaseService) {}

  getDocs(filters?: any) {
    this.numberFilter$ = new BehaviorSubject(null);
    this.shelfFilter$ = new BehaviorSubject(null);

    return this.items$ = combineLatest(
      this.numberFilter$,
      this.shelfFilter$
    ).pipe(
      switchMap(([number, shelf]) => {
        return this.afService.col<ListItem>('store', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (number) { query = query.where('number', '==', number).orderBy('number', 'desc'); }
          if (shelf) { query = query.where('shelf', '==', shelf).orderBy('shelf', 'desc'); }
          return query;
        }).valueChanges();
      })
    );
  }

  getLists(search: ListSearchProperty): Observable<ListItem[]> {
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
