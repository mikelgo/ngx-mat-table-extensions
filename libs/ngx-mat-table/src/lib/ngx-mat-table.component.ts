import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  Input, Output, EventEmitter
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NgxColumnDefinition } from './models/ngx-column-definition';
import { NgxTableConfigProvider } from './ngx-table-config-provider';
import { accessSubProp } from './helper/access-sub-props';

/**
 * How to get the component as flexible as possible?
 *
 * Sorting
 * - yes/ no
 *
 * - custom templates
 * - custom components as templates
 * - displayproperty with .-notation maybe advanced typescript features ? keyof T
 * - displayProperty also supporting display functions?
 */

@Component({
  // todo mat-table[ngx-mat-table] ?
  // tslint:disable-next-line:component-selector
  selector: 'ngx-mat-table',
  templateUrl: './ngx-mat-table.component.html',
  styleUrls: ['./ngx-mat-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxMatTableComponent<T> implements AfterViewInit {
  @Input() set trackByFnReference(arg: any) {
    if (typeof arg !== 'function') {
      throw new Error('arg for trackByFnReference is not a function!');
    }
    if (!arg) {
      throw new Error('arg for trackByFnReference is null or undefined!');
    }
    this.trackByFnRef = arg;
  }

  @Input() tableConfigProvider: NgxTableConfigProvider<T> = null;
  private trackByFnRef = undefined;

  @Output() rowSelect = new EventEmitter<T>();
  // Todo what is the type here
  @Output() cellSelect = new EventEmitter<any>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor() {}

  ngAfterViewInit(): void {
    if (this.tableConfigProvider) {
      if (this.sort) {
        this.setupSorting(this.sort);
      }
    }
  }

  public trackByFn(index: number, item: T): any {
    if (!this.trackByFnRef) {
      return undefined;
    } else {
      return this.trackByFnRef;
    }
  }

  /**
   * Returns the property which should be rendered in the table.
   *
   * If in a {@link NgxColumnDefinition} a displayProperty is set then this prop should be rendered.
   *
   * If this property is not rendered then the whole object T will be passed for rendering. You will then need to
   * provide:
   * a displayFn to define which properties of the object should be rendered, otherwise
   * you will only get a [object object] in the table.
   *
   * and a {@link TemplateRef}
   *
   * This is usually used when you want to display multiple properties of one or more objects in one column
   * (e.g. production country or production country group in Delivery-Mode table).
   *
   * @param element - the object to be rendered
   * @param columnDefinition
   */
  public getDisplayProp(
    element: T,
    columnDefinition: NgxColumnDefinition
  ): T | any {
    if (columnDefinition.displayProperty) {
      return accessSubProp(element, columnDefinition?.displayProperty);
    } else {
      return element;
    }
  }

  private setupSorting(sort: MatSort): void {
    this.tableConfigProvider.getDataSource().sort = sort;
    this.tableConfigProvider.getDataSource().sortingDataAccessor = (
      object,
      sortHeaderId
    ) =>
      this.handleSortDirection(
        accessSubProp(object, this.getPropForSortHeaderId(sortHeaderId))
      );
  }
  private getPropForSortHeaderId(sortHeaderId: string): string {
    if (sortHeaderId) {
      const column = this.tableConfigProvider
        .getDisplayColumnDefinitions()
        .find((value) => value.headerId === sortHeaderId);
      return column.displayProperty;
    }
  }

  /**
   * Defines the sorting direction
   * @param property
   * @private
   */
  private handleSortDirection(property: any): any {
    /**
     * For strings the direction is uppercase letter and then lowercase letter
     */
    if (typeof property === 'string') {
      return property.toLocaleLowerCase();
    }
    return property;
  }

  /**
   *
   * @param row - the row which has been clicked in the table
   * @param column - the column which has been clicked
   */
  onRowSelect(row: T, column: NgxColumnDefinition): void {
    /**
     * Emit selected row
     */
    this.rowSelect.emit(row);
    /**
     * Emit selected cell element
     */
    this.cellSelect.emit(accessSubProp(row, column?.displayProperty))
  }

}
