import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {DataDataSource} from './data-datasource';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent, merge} from 'rxjs';
import {StoreService} from '../../../../core/services/store.service';
import {ActivatedRoute} from '@angular/router';
import {ListItem} from '../../../../core/models/list-item';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('number') number: ElementRef<HTMLInputElement>;
  @ViewChild('shelf') shelf: ElementRef<HTMLInputElement>;
  storeName: string;
  dataSource: DataDataSource;

  /** Columns displayed in the table. */
  displayedColumns = ['number', 'shelf', 'quantity', 'management'];

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.storeName = params.get('store');
    });
    this.dataSource = new DataDataSource(this.storeService);
    this.dataSource.loadStoreItem({
      number: '',
      shelf: '',
      sortOrder: 'asc',
      sortActive: 'number',
      pageNumber: 0,
      pageSize: 10,
    });
  }

  ngAfterViewInit() {
    this.bindEvents();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadStoreListsPage())
      )
      .subscribe();
  }

  bindEvents() {
    fromEvent(this.number.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadStoreListsPage();
        })
      )
      .subscribe();
    fromEvent(this.shelf.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadStoreListsPage();
        })
      )
      .subscribe();
  }

  loadStoreListsPage() {
    this.dataSource.loadStoreItem({
      number: this.number.nativeElement.value,
      shelf: this.shelf.nativeElement.value,
      sortOrder: this.sort.direction,
      sortActive: this.sort.active,
      pageNumber: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    });
  }

  onRowClicked(row: ListItem) {
    console.log('row clicked:', row);
  }

  edit(row: ListItem) {
    console.log(row);
  }

  delete(row: ListItem) {
    console.log(row);
  }
}
