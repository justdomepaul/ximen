import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from './modules/not-found/not-found.component';
import {LayoutComponent} from './modules/layout/layout.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: './modules/user/user.module#UserModule'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [
      AuthGuard,
    ],
    children: [
      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
      },
      {
        path: 'index',
        component: DashboardComponent
      },
      {
        path: 'store/:store',
        loadChildren: './modules/store/store.module#StoreModule'
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
