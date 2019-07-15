import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlertConfig} from '../../../../core/models/alert-config';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  config: AlertConfig;
  @Output()
  Check = new EventEmitter();
  @Output()
  Close = new EventEmitter();
  constructor(
    private dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) data: AlertConfig) {
    this.config = data;
  }

  ngOnInit() {
  }

  check() {
    this.Check.emit();
  }

  close() {
    this.Close.emit();
  }
}
