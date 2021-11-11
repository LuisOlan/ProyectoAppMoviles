import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children:[
      {
        path:'tabs',
        loadChildren: () => import('../tabs/tabs.module').then(m=>m.TabsPageModule)
      }
    ]
  },
  {
    path: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
