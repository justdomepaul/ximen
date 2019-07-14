import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard#canActivate called');
    return new Observable<boolean>((observer) => {
      this.authService.user$.subscribe((user: User) => {
        if (!user) {
          observer.next(true);
          observer.complete();
        } else {
          this.router.navigateByUrl('/index');
          observer.error(false);
        }
      });
    });
  }
}
