import { Injectable } from '@angular/core';
import {AlertComponent} from '../../modules/share/dialog/alert/alert.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {FullSpinnerService} from './full-spinner.service';
import {AlertConfig} from '../models/alert-config';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private dialog: MatDialog, private fullSpinnerService: FullSpinnerService) { }

  openDialog(config: AlertConfig): MatDialogRef<AlertComponent> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.role = 'alertdialog';
    dialogConfig.minWidth = '250px';
    dialogConfig.maxWidth = '350px';

    dialogConfig.data = {
      id: 1,
      title: config.title,
      description: config.description,
      hiddenCancel: config.hiddenCancel,
      checkName: config.checkName,
      cancelName: config.cancelName
    };

    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);
    if (config.enableProgress) {
      dialogRef.beforeClosed().subscribe(() => {
        this.fullSpinnerService.showSpinner();
      });

      dialogRef.afterClosed().subscribe(
        () => {
          this.fullSpinnerService.closeSpinner();
        }
      );
    }

    return dialogRef;
  }

  closeAllDialog() {
    this.dialog.closeAll();
  }
}
