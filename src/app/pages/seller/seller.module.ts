import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SellerRoutingModule } from './seller-routing.module';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    IndexComponent,
    ShowComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SellerModule { }
