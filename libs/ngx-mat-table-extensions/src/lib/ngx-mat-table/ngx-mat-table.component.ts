import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NgxColumnDefinition } from './models/ngx-column-definition';
import { NgxTableConfigProvider } from './ngx-table-config-provider';

/**
 * How to get the component as flexible as possible?
 * Filtering
 * - yes/ no
 *
 * Sorting
 * - yes/ no
 * - correct sorting means a/A b/B etc.
 *
 * - custom templates
 * - custom components as templates
 * - displayproperty with .-notation maybe advanced typescript features ? keyof T
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

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor() {}

  ngAfterViewInit(): void {
    if (this.tableConfigProvider) {
      this.tableConfigProvider.getDataSource().sort = this.sort;
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
      return element[columnDefinition.displayProperty];
    } else {
      return element;
    }
  }
}
