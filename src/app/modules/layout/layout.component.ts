import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLargeScreen: boolean;
  admin = false;
  constructor(private authService: AuthService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 599px)'])
      .subscribe((state: BreakpointState) => {
        this.isLargeScreen = state.matches;
      });
    this.authService.user$.subscribe((user: User) => {
      if (user.roles.hasOwnProperty('admin')) {
        this.admin = user.roles.admin;
      }
    })
  }

  logout() {
    this.authService.signOut();
  }
}
