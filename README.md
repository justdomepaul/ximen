# Baseproject

### start list

### static github-page
```bash
$ npm install -g npx
$ npm i -g angular-cli-ghpages
$ ng build --prod --base-href "https://{github account}.github.io/{repo name}/"
$ npx ngh --dir=dist/{angular project name}
```

### material
```bash
$ npm install --save bourbon ionicons @angular/material@7.3.7 @angular/cdk@7.3.7 @angular/animations@7.2.15 hammerjs @angular/material-moment-adapter@7.3.7 firebase @angular/fire firebaseui moment
```

### firebase
1. change user-signin.component.ts: uiConfig.signInOptions[0].clientId => Google console OAuth2.0 ClientID
2. apply privacyPolicy terms on app.termly.io
3. modify uiConfig.tosUrl and uiConfig.privacyPolicyUrl

### firestore
1. login your first account
2. modify firestore/users/{your uid document} roles->add {admin:true}
3. template secure rules
```conf
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	function getRole(role) {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles[role]
		}
    match /users/{userId} {
    	allow get: if request.auth.uid != null;
      allow list: if request.auth.uid != null && getRole('admin');
      allow create: if request.auth.uid != null;
      allow update: if request.auth.uid != null && getRole('admin');
      allow delete: if request.auth.uid != null && getRole('admin');
    }
    match /store/{storeId} {
    	allow read: if request.auth.uid != null;
      allow write: if request.auth.uid != null && (getRole('admin') || getRole('editor'));
    }
  }
}
```
