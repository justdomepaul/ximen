import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import {debounceTime, distinctUntilChanged, tap, map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {Router} from '@angular/router';
import { FullSpinnerService } from 'src/app/core/services/full-spinner.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('keyword') keyword: ElementRef<HTMLInputElement>;
  dataSource = new MatTableDataSource();

  /** Columns displayed in the table. */
  displayedColumns = ['uid', 'displayName', 'email', 'phoneNumber', 'role', 'management'];
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: FullSpinnerService,
  ) { }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.authService.getDocs().subscribe((res: User[]) => {
      this.dataSource.data = res;
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

  onRowClicked(row: User) {
    console.log('row clicked:', row);
  }

  edit(row: User) {
    this.router.navigateByUrl(`/information/edit/${row.uid}`);
  }
}
