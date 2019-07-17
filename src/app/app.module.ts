import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatBadgeModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule,
  MatGridListModule,
  MatFormFieldModule,
  MatTooltipModule,
} from '@angular/material';
import {environment} from '../environments/environment';
import {NotFoundComponent} from './modules/not-found/not-found.component';
import {LayoutComponent} from './modules/layout/layout.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {SpinnerModule} from './modules/share/spinner/spinner.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LayoutComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatGridListModule,
    MatFormFieldModule,
    MatTooltipModule,
    SpinnerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
