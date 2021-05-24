import { TemplateResult } from 'lit';
import { StyleInfo } from 'lit/directives/style-map';

import { Header } from '../DataTable.js';

export class LitHeader<RowType> implements Header<RowType> {
  /**
   * Header is the name or a TemplateResult for custom HTML.
   */
  header: string | TemplateResult = '';

  headerStyles?: (row: RowType) => StyleInfo;

  columnStyles?: (row: RowType) => StyleInfo;

  /**
   * CellMapper maps the RowType to the value to show in the table cell for
   * this row. Can also be a TemplateResult for custom HTML.
   * @returns string to show or custom HTML to show in the cell
   */
  cellRenderer: (row: RowType) => string | TemplateResult = () => '';

  cellStyles?: (row: RowType) => StyleInfo;

  static of<T>(partial: Partial<LitHeader<T>>): LitHeader<T> {
    return Object.assign(new LitHeader(), partial);
  }
}
