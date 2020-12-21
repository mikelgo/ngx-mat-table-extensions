/**
 * ColumnDefinition for {@link NgxTableComponent}
 *
 */
import { TemplateRef } from '@angular/core';

export interface NgxColumnDefinition {
  /**
   * Property of an object which should be shown in a table. If it is not set
   * then the whole object will be passed to the table
   */
  displayProperty?: string;
  /**
   * ID which will be used from Angular material to distinguish between
   * columns
   */
  headerId: string;
  /**
   * Title which will be shown as column title
   */
  title: string;
  /**
   * TemplateRef to render a custom template for a column
   * Todo or component
   */
  cellTemplate?: TemplateRef<any>
  /**
   * Show/hide column in table
   */
  hide?: boolean;

  // todo give here also sorting property?
}
