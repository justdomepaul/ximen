import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe((result) => console.log(result));
  }

  logout() {
    this.authService.signOut();
  }
}
