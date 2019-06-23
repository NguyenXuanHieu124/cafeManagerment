import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TableStatusPipe } from './pipes/tablestatus.pipe';
import { DescriptionPipe } from './pipes/description.pipe';
import { PipeNameProductPipe } from './pipes/pipenameproduct.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    TableStatusPipe,
    DescriptionPipe,
    PipeNameProductPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDatepickerModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    TableStatusPipe,
    DescriptionPipe,
    PipeNameProductPipe

  ]
})
export class SharedModule { }
