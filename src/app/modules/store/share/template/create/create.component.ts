import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertConfig} from '../../../../../core/models/alert-config';
import {AlertService} from '../../../../../core/services/alert.service';
import { StoreItem } from 'src/app/core/models/store-item';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private _storeItem = new BehaviorSubject<StoreItem>(null);

  @Input() title: string;
  @Input()
  set storeItem(value) {
    this._storeItem.next(value);
  }
  get storeItem() {
    return this._storeItem.getValue();
  }

  storeFormGroup: FormGroup;
  @Output()
  Save = new EventEmitter();
  @Output()
  Cancel = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    // this.defaultFormGroup(this.storeItem);
    this._storeItem.subscribe(
      (item: StoreItem) => {
        this.storeFormGroup = this.fb.group({
          productInfo: this.fb.group({
            number: this.fb.control({
              value: item ? item.number : '',
              disabled: false,
            }, [Validators.required]),
            shelf: this.fb.control({
              value: item ? item.shelf : '',
              disabled: false,
            }, [Validators.required]),
            quantity: this.fb.control({
              value: item ? item.quantity : '',
              disabled: false,
            }, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
          })
        });
      },
      (err) => {
        this.snackBar.open('系統錯誤，請嘗試重整頁面，或聯絡系統管理員。', 'Close', {
          duration: null,
          panelClass: 'error'
        });
        this.location.back();
      });
  }

  openDialog() {
    if (!this.storeFormGroup.valid) {
      return;
    }
    let resp: StoreItem = this.storeFormGroup.value.productInfo;
    const dialog = this.alertService.openDialog(<AlertConfig> {
      title: '',
      description: '是否確認新增庫存',
      hiddenCancel: false,
      checkName: '確認',
      cancelName: '取消',
      enableProgress: true,
    });

    dialog.componentInstance.Check.subscribe((result) => {
      this.Save.emit(resp);
      this.alertService.closeAllDialog();
    });

    dialog.componentInstance.Close.subscribe((result) => {
      dialog.close();
    });
  }

  cancel() {
    this.Cancel.emit(false);
  }
}
