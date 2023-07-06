import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'ciudades',
    loadChildren: () => import('./pages/city/city.module').then(m => m.CityModule)
  },
  {
    path: 'vendedores',
    loadChildren: () => import('./pages/seller/seller.module').then(m => m.SellerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
