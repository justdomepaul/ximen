import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {StoreService} from '../../../../core/services/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListItem} from '../../../../core/models/list-item';
import { AlertService } from 'src/app/core/services/alert.service';
import { AlertConfig } from 'src/app/core/models/alert-config';
import { FullSpinnerService } from 'src/app/core/services/full-spinner.service';

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
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    private spinnerService: FullSpinnerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.route.paramMap.subscribe(params => {
      this.storeName = params.get('store');
    });
    this.storeService.getDocs().subscribe((res) => {
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
    this.router.navigateByUrl(`/store/${this.storeName}/edit/${row.id}`);
  }

  delete(row: ListItem) {
    const dialog = this.alertService.openDialog(<AlertConfig> {
      title: '',
      description: `是否刪除該庫存品項，庫存編號:${row.number}`,
      hiddenCancel: false,
      checkName: '確認',
      cancelName: '取消',
      enableProgress: true,
    });

    dialog.componentInstance.Check.subscribe((result) => {
      this.storeService.remove(row.id).then(
        () => {
          this.snackBar.open(`已成功刪除庫存品項，庫存編號：${row.number}`, 'Close', {
            duration: 1500,
            panelClass: 'success'
          });
        },
        (err) => {
          this.snackBar.open('系統錯誤，請嘗試重整頁面，或聯絡系統管理員。', 'Close', {
            duration: null,
            panelClass: 'error'
          });
        });
      this.alertService.closeAllDialog();
    });

    dialog.componentInstance.Close.subscribe((result) => {
      dialog.close();
    });
  }
}
