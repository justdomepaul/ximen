import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../models/user';
import AuthProvider = firebase.auth.AuthProvider;
import {auth} from 'firebase';
import FacebookAuthProvider = auth.FacebookAuthProvider;
import GithubAuthProvider = auth.GithubAuthProvider;
import GoogleAuthProvider = auth.GoogleAuthProvider;
import TwitterAuthProvider = auth.TwitterAuthProvider;
import {AngularfirebaseService} from './angularfirebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  redirecting = false;
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularfirebaseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.afAuth.authState.pipe(take(1)).subscribe(user => {
      if (user) {
        const userRef: AngularFirestoreDocument<any> = this.db.doc(
          `users/${user.uid}`
        );
        userRef.ref.get().then(value => {
          if (value.exists) {
            const data: User = {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              displayName: user.displayName || user.email || user.phoneNumber,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL
            };
            const uid = user.uid;
            const updatedUser = { uid, ...value.data() };
            this.updateUserData(updatedUser).catch(error => {
              console.log(error);
              router.navigate(['/user/login']);
            });
          } else {
            const data: User = {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              displayName: user.displayName || user.email || user.phoneNumber,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              roles: {
                subscriber: true
              }
            };
            this.setUserData(data).catch(error => {
              console.log(error);
              router.navigate(['/user/login']);
            });
          }
        });
      }
    });
  }

  private afAuthLogin(provider: AuthProvider) {
    this.afAuth.auth
      .signInWithRedirect(provider)
      .then(value => console.log(value), reason => console.log(reason));
  }

  canCreate(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.snackBar.open(error.message, 'Close', {
      duration: null,
      panelClass: 'error'
    });
  }
  linkFacebook() {
    return this.afAuth.auth.currentUser.linkWithRedirect(
      new FacebookAuthProvider()
    );
  }
  linkGithub() {
    return this.afAuth.auth.currentUser.linkWithRedirect(
      new GithubAuthProvider()
    );
  }
  linkGoogle() {
    return this.afAuth.auth.currentUser.linkWithRedirect(
      new GoogleAuthProvider()
    );
  }
  linkTwitter() {
    return this.afAuth.auth.currentUser.linkWithRedirect(
      new TwitterAuthProvider()
    );
  }
  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() =>
        this.snackBar.open('Password update email sent', '', {
          panelClass: 'info'
        })
      )
      .catch(error => this.handleError(error));
  }
  public setUserData(user: User) {
    return this.db.set(`users/${user.uid}`, user);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
  unlinkFacebook() {
    return this.afAuth.auth.currentUser.unlink('facebook.com');
  }
  unlinkGithub() {
    return this.afAuth.auth.currentUser.unlink('github.com');
  }
  unlinkGoogle() {
    return this.afAuth.auth.currentUser.unlink('google.com');
  }
  unlinkTwitter() {
    return this.afAuth.auth.currentUser.unlink('twitter.com');
  }

  // Sets user data to firestore after succesful signin
  private updateUserData(user: User) {
    return this.db.update(`users/${user.uid}`, user);
  }
}
