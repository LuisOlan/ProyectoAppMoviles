import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'favoritos',
        loadChildren: () => import('../favoritos/favoritos.module').then(m=>m.FavoritosPageModule)
      },
      {
        path:'reporte',
        loadChildren: () => import('../reporte/reporte.module').then(m=>m.ReportePageModule)
      },
      {
        path:'faq',
        loadChildren: () => import('../faq/faq.module').then(m=>m.FAQPageModule)
      },
      {
        path:'',
        redirectTo:'/tabs/favoritos',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
