import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss']
})
export class UserSigninComponent implements OnInit, OnDestroy {
  constructor(
    public breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth,
    private router: Router) {}
  isLargeScreen: boolean;
  ui: firebaseui.auth.AuthUI;
  ngOnDestroy(): void {
    this.ui.delete();
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 599px)'])
      .subscribe((state: BreakpointState) => {
        this.isLargeScreen = state.matches;
      });
    // FirebaseUI config.
    const uiConfig = {
      signInSuccessUrl: 'http://localhost:4200/index',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          authMethod: 'https://accounts.google.com',
          // Required to enable ID token credentials for this provider.
          // This can be obtained from the Credentials page of the Google APIs
          // console.
          clientId: '158814778102-051dt3g9ss17u8v2etav50fespuum1o5.apps.googleusercontent.com',
          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: 'select_account'
          }
        },
        // {
        //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //   scopes: [
        //     'public_profile',
        //     'email',
        //     'user_likes',
        //     'user_friends'
        //   ],
        //   customParameters: {
        //     // Forces password re-entry.
        //     auth_type: 'reauthenticate'
        //   }
        // },
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      // Required to enable one-tap sign-up credential helper.
      // credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: 'https://app.termly.io/document/privacy-policy/698dfd79-0690-4fb1-abb0-44a4ab00e131',
      // Privacy policy url/callback.
      privacyPolicyUrl: () => {
        window.location.assign('https://app.termly.io/document/privacy-policy/698dfd79-0690-4fb1-abb0-44a4ab00e131');
      }
    };

    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }
}
