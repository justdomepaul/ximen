import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { StoreItem } from 'src/app/core/models/store-item';
import { StoreService } from 'src/app/core/services/store.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(
    private location: Location,
    private storeService: StoreService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
  }

  save(resp: StoreItem) {
    this.storeService.upsert(resp, true).then(
      () => {
        this.snackBar.open(`已成功新增庫存，庫存編號：${resp.number}`, 'Close', {
          duration: 2000,
          panelClass: 'success'
        });
        this.location.back();
      }, (err) => {
        console.error(err);
        this.snackBar.open('系統錯誤，請嘗試重整頁面，或聯絡系統管理員。', 'Close', {
          duration: null,
          panelClass: 'error'
        });
      });
  }

  cancel(event) {
    this.location.back();
  }
}
