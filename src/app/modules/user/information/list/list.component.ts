import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ListItem} from '../../../../core/models/list-item';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AlertService } from 'src/app/core/services/alert.service';
import { AlertConfig } from 'src/app/core/models/alert-config';
import { FullSpinnerService } from 'src/app/core/services/full-spinner.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('keyword') keyword: ElementRef<HTMLInputElement>;
  dataSource = new MatTableDataSource();

  /** Columns displayed in the table. */
  displayedColumns = ['number', 'shelf', 'quantity', 'management'];
  isLargeScreen: boolean;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    public alertService: AlertService,
    private spinnerService: FullSpinnerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.breakpointObserver
      .observe(['(min-width: 599px)'])
      .subscribe((state: BreakpointState) => {
        this.isLargeScreen = state.matches;
      });
    this.authService.getDocs().subscribe((res) => {
      this.dataSource.data = res
      this.spinnerService.closeSpinner();
    });
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onRowClicked(row: ListItem) {
    console.log('row clicked:', row);
  }

  edit(row: ListItem) {
    this.router.navigateByUrl(`/information/edit/${row.id}`);
  }
}
