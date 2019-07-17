import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { User, Roles } from 'src/app/core/models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user: User;
  uid: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.uid = params.get('id');
      this.authService.getDoc(this.uid).subscribe(
        (data: User) => {
          this.user = data;
        },
        (err) => {
          this.snackBar.open('系統錯誤，請嘗試重整頁面，或聯絡系統管理員。', 'Close', {
            duration: null,
            panelClass: 'error'
          });
          this.location.back();
        })
    });
  }

  save(resp: Roles) {
    this.user.roles = resp;
    console.log(this.user);
    this.authService.upsert(this.user).then(
      () => {
        this.snackBar.open(`已成功更新權限，會員名稱：${this.user.displayName}`, 'Close', {
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

  cancel() {
    this.location.back();
  }
}
