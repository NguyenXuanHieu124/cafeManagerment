import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerbranchincomeComponent } from './managerbranchincome/managerbranchincome.component';
import { ManagerComponent } from './manager.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

@NgModule({
  declarations: [
    ManagerComponent,
    ManagerbranchincomeComponent

  ],
  imports: [
    CommonModule,
    FormsModule ,
    ManagerRoutingModule,
    BsDatepickerModule,
    BsDatepickerModule.forRoot(),

  ],
  exports: [ManagerComponent,ManagerbranchincomeComponent ]
})
export class ManagerModule { }
