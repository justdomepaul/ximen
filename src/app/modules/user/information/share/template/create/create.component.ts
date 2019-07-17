import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User, Roles } from 'src/app/core/models/user';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AlertService } from 'src/app/core/services/alert.service';
import { AlertConfig } from 'src/app/core/models/alert-config';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private User$ = new BehaviorSubject<User>(null);

  @Input() title: string;
  @Input()
  set user(value) {
    this.User$.next(value);
  }
  get user() {
    return this.User$.getValue();
  }

  userFormGroup: FormGroup;
  disabled = false;

  @Output()
  Save = new EventEmitter();
  @Output()
  Cancel = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.User$.subscribe(
      (item: User) => {
        console.log(item)
        this.userFormGroup = this.fb.group({
          admin: [item && item.roles.hasOwnProperty('admin') ? item.roles.admin : false],
          editor: [item && item.roles.hasOwnProperty('editor') ? item.roles.editor : false],
          subscriber: [item && item.roles.hasOwnProperty('subscriber') ? item.roles.subscriber : false],
        }, [Validators.required])
      },
      (err) => {
        this.snackBar.open('權限不足或系統錯誤，請嘗試重整頁面，或聯絡系統管理員。', 'Close', {
          duration: null,
          panelClass: 'error'
        });
        this.location.back();
      });
  }

  openDialog() {
    if (!this.userFormGroup.valid) {
      return;
    }
    this.disabled = true;
    const resp: Roles = this.userFormGroup.value;
    console.log(resp)
    const dialog = this.alertService.openDialog(<AlertConfig> {
      title: '',
      description: '是否確認更新會員權限',
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
      this.disabled = false;
      dialog.close();
    });
  }

  cancel() {
    this.Cancel.emit(false);
  }

}
