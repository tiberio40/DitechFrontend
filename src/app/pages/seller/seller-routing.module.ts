import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'detalle/:id',
    component: ShowComponent
  },{
    path: 'crear',
    component: FormComponent
  },
  {
    path: 'editar/:id',
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
