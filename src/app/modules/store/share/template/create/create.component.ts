import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StoreService} from '../../../../../core/services/store.service';
import {AlertConfig} from '../../../../../core/models/alert-config';
import {AlertService} from '../../../../../core/services/alert.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input() title: string;
  storeFormGroup: FormGroup;
  @Output()
  Save = new EventEmitter();
  @Output()
  Cancel = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private storeService: StoreService,
    public alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.storeFormGroup = this.fb.group({
      productInfo: this.fb.group({
        number: this.fb.control({
          value: '',
          disabled: false,
        }, [Validators.required]),
        shelf: this.fb.control({
          value: '',
          disabled: false,
        }, [Validators.required]),
        quantity: this.fb.control({
          value: '',
          disabled: false,
        }, [Validators.required]),
      })
    });
  }

  openDialog() {
    const dialog = this.alertService.openDialog(<AlertConfig> {
      title: '',
      description: '是否確認新增庫存',
      hiddenCancel: false,
      checkName: '確認',
      cancelName: '取消',
      enableProgress: true,
    });

    dialog.componentInstance.Check.subscribe((result) => {
      console.log('check', result);
      this.Save.emit(true);
      this.alertService.closeAllDialog();
    });

    dialog.componentInstance.Close.subscribe((result) => {
      console.log('close', result);
      dialog.close();
    });
  }

  cancel() {
    this.Cancel.emit(false);
    this.location.back();
  }
}
