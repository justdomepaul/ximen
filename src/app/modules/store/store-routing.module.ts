import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

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
  {
    path: 'edit/:id',
    loadChildren: './edit/edit.module#EditModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
