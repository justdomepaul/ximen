import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLargeScreen: boolean;
  constructor(private authService: AuthService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 599px)'])
      .subscribe((state: BreakpointState) => {
        this.isLargeScreen = state.matches;
      });
  }

  logout() {
    this.authService.signOut();
  }
}
