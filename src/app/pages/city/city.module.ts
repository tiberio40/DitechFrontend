import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CityRoutingModule } from './city-routing.module';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    IndexComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CityModule { }
