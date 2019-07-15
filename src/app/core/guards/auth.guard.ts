import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('AuthGuard#canActivate called');
    return new Observable<boolean>((observer) => {
      this.authService.user$.subscribe((user: User) => {
        // console.log(user);
        if (user) {
          observer.next(true);
          observer.complete();
        } else {
          this.router.navigateByUrl('/user/login');
          observer.error(false);
        }
      });
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('AuthGuard#canActivateChild called');
    return this.canActivate(route, state);
  }
}
