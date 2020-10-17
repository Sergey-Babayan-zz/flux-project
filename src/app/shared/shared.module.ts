import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TimePassedPipe } from './pipes';

@NgModule({
  declarations: [
    TimePassedPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDatatableModule,

    TimePassedPipe
  ]
})
export class SharedModule { }
