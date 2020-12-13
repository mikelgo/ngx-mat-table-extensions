import { MatTableDataSource } from '@angular/material/table';
import { NgxColumnDefinition } from './models/ngx-column-definition';
import { MatSort } from '@angular/material/sort';
import { accessSubProp } from './helper/access-sub-props';



/**
 * This class can be used as a default config provider for a {@link StandardTableComponent} if
 * you do not need any custom sorting or filter-predicate.
 *
 */
export class NgxTableConfigProvider<T> {
  protected readonly datasource: MatTableDataSource<T> = null;
  protected readonly columnDefinitions: NgxColumnDefinition[] = [];
  constructor(
    datasource: MatTableDataSource<T>,
    columnDefinitions: NgxColumnDefinition[]
  ) {
    this.datasource = datasource;
    this.columnDefinitions = columnDefinitions;
  }
  /**
   * Connects the incoming data-stream to the underlying data source
   * @param data
   * @return void
   */
  connectDataSource(data: T[]): void {
    this.datasource.data = data;
  }
  /**
   * @return the {@MatTableDataSource}
   */
  getDataSource(): MatTableDataSource<T> {
    return this.datasource;
  }
  /**
   * Returns all {@link NgxColumnDefinition} for visible columns
   * @param columnDefinitions
   */
  getDisplayColumnDefinitions(): NgxColumnDefinition[] {
    return this.columnDefinitions.filter(
      (column: NgxColumnDefinition) => !column.hide
    );
  }
  /**
   * Returns all column header ID's for visible columns
   * @param columnDefinitions
   */
  getDisplayColumnHeaderIds(): string[] {
    return this.columnDefinitions
      .filter((column: NgxColumnDefinition) => !column.hide)
      .map((column: NgxColumnDefinition) => column.headerId);
  }




}
