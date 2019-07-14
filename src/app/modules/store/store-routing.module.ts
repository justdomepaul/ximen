import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store/:store/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListModule'
  },
  {
    path: 'new',
    loadChildren: './new/new.module#NewModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
