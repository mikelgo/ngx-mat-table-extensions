import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatTableModule } from '@ngx-mat-table-extensions/ngx-mat-table';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxMatTableModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
