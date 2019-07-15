import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent, merge} from 'rxjs';
import {StoreService} from '../../../../core/services/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListItem} from '../../../../core/models/list-item';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('keyword') keyword: ElementRef<HTMLInputElement>;
  storeName: string;
  dataSource = new MatTableDataSource();

  /** Columns displayed in the table. */
  displayedColumns = ['number', 'shelf', 'quantity', 'management'];
  isLargeScreen: boolean;
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 599px)'])
      .subscribe((state: BreakpointState) => {
        this.isLargeScreen = state.matches;
      });
    return this.storeService.getDocs().subscribe(res => this.dataSource.data = res);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.bindEvents();
  }

  bindEvents() {
    fromEvent(this.keyword.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.applyFilter(this.keyword.nativeElement.value);
        })
      )
      .subscribe();
  }

  onRowClicked(row: ListItem) {
    console.log('row clicked:', row);
  }

  edit(row: ListItem) {
    console.log(row);
    this.router.navigateByUrl(`/store/${this.storeName}/edit/${row.id}`);
  }

  delete(row: ListItem) {
    console.log(row);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
