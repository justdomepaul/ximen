import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';
import {StoreService} from '../../../../core/services/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListItem} from '../../../../core/models/list-item';
import {AlertService} from 'src/app/core/services/alert.service';
import {AlertConfig} from 'src/app/core/models/alert-config';
import {FullSpinnerService} from 'src/app/core/services/full-spinner.service';
import {SelectionModel} from '@angular/cdk/collections';

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
  selection = new SelectionModel<ListItem>(true, []);
  hasSeleted = false;
  /** Columns displayed in the table. */
  displayedColumns = ['checkbox', 'number', 'shelf', 'management'];

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    private spinnerService: FullSpinnerService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.route.paramMap.subscribe(
      params => {
        this.storeName = params.get('store');
      }, err => {
        console.error(err);
        this.spinnerService.closeSpinner();
        this.snackBar.open('系統錯誤，請嘗試重整頁面，或聯絡系統管理員。', 'Close', {
          duration: null,
          panelClass: 'error'
        });
      });
    this.storeService.getDocs().subscribe(
      (res) => {
        this.dataSource.data = res;
        this.spinnerService.closeSpinner();
      }, err => {
        console.error(err);
        this.spinnerService.closeSpinner();
        this.snackBar.open('系統錯誤，請嘗試重整頁面，或聯絡系統管理員。', 'Close', {
          duration: null,
          panelClass: 'error'
        });
      });
    this.selection.changed.subscribe(
      (result) => {
        this.hasSeleted = result.source.selected.length > 0;
      }
    );
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
      ).subscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onRowClicked(row: ListItem) {
    this.selection.toggle(row);
    console.log(this.selection.selected);
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
          console.error(err);
          this.snackBar.open('系統錯誤，請嘗試重整頁面，或聯絡系統管理員。', 'Close', {
            duration: null,
            panelClass: 'error'
          });
        });
      this.alertService.closeAllDialog();
    });

    dialog.componentInstance.Close.subscribe(() => {
      dialog.close();
    });
  }

  deleteSelected() {
    const dialog = this.alertService.openDialog(<AlertConfig> {
      title: '',
      description: `是否刪除已選取的庫存品項`,
      hiddenCancel: false,
      checkName: '確認',
      cancelName: '取消',
      enableProgress: true,
    });

    dialog.componentInstance.Check.subscribe((result) => {
      this.storeService.removes(this.selection.selected).then(
        () => {
          this.snackBar.open(`已成功刪除庫存品項`, 'Close', {
            duration: 1500,
            panelClass: 'success'
          });
        },
        (err) => {
          console.error(err);
          this.snackBar.open('系統錯誤，請嘗試重整頁面，或聯絡系統管理員。', 'Close', {
            duration: null,
            panelClass: 'error'
          });
        });
      this.alertService.closeAllDialog();
    });

    dialog.componentInstance.Close.subscribe(() => {
      this.selection.clear();
      dialog.close();
    });
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(ref) {
    // if there is a selection then clear that selection
    if (this.isSomeSelected()) {
      this.selection.clear();
      ref.checked = false;
    } else {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  isSomeSelected() {
    return this.selection.selected.length > 0;
  }
}
