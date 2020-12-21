import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxMatTableComponent } from './ngx-mat-table.component';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, MatSortModule, MatTableModule],
  declarations: [NgxMatTableComponent],
  exports: [NgxMatTableComponent]
})
export class NgxMatTableModule {}
