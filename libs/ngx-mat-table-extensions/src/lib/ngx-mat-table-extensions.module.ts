import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatTableComponent } from './ngx-mat-table/ngx-mat-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, MatSortModule, MatTableModule],
  declarations: [NgxMatTableComponent],
  exports: [NgxMatTableComponent]
})
export class NgxMatTableExtensionsModule {}
