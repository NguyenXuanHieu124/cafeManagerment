import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableListComponent } from './table-list/table-list.component';
import { TableComponent } from './table/table.component';
import { SharedModule } from 'src/@shared/shared.module';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NewTableComponent } from './new-table/new-table.component';

@NgModule({
  declarations: [
    TableListComponent,
    TableComponent,
    TableComponent,
    NewTableComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    SharedModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents:[NewTableComponent]
})
export class TableModule { }
