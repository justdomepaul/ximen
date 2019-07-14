import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {ListItem} from '../../../../core/models/list-item';
import {ListSearchProperty} from '../../../../core/models/list-search-property';
import {StoreService} from '../../../../core/services/store.service';

/**
 * Data source for the Data view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataDataSource extends DataSource<ListItem> {
  data: ListItem[] = [];
  private ListItemSubject = new BehaviorSubject<ListItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private storeService: StoreService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(collectionViewer: CollectionViewer): Observable<ListItem[]> {
    return this.ListItemSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.ListItemSubject.complete();
    this.loadingSubject.complete();
  }

  loadStoreItem(listSearch: ListSearchProperty) {
    this.loadingSubject.next(true);
    this.storeService.getLists(listSearch)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(listItems => this.ListItemSubject.next(listItems));
  }
}
