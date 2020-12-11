import { MatTableDataSource } from '@angular/material/table';
import { NgxColumnDefinition } from './models/ngx-column-definition';

export interface DatasourceConnector<T> {
  connectFilterPredicate(): void;
  connectSortingDataAccessor(): void
  filterPredicate(data: T, filter: string): boolean
  sortingDataAccessor(  data: T, sortHeaderId: string): string | number
}

/**
 * This class can be used as a default config provider for a {@link StandardTableComponent} if
 * you do not need any custom sorting or filter-predicate.
 *
 */
// TODO how to handle implementation of DatasourceConnector Interface?
/**
 * How about:
 * provide default functionality with dot-notation for sorting and user must only specify in the
 * columndefinition the property to sort .eg [object.property1, object.property2] --> As addition in ColumnDefinition
 *
 * For filterpredicate the user must provide a custom filter function?
 * Better ways to do this?
 */
export class NgxTableConfigProvider<T> {
  protected readonly datasource: MatTableDataSource<T> = null;
  protected readonly columnDefinitions: NgxColumnDefinition[] = [];
  constructor(datasource: MatTableDataSource<T>, columnDefinitions: NgxColumnDefinition[]) {
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
    return this.columnDefinitions.filter((column: NgxColumnDefinition) => !column.hide);
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
