import { Header } from '../DataTable.js';

export class StringHeader<RowType> implements Header<RowType> {
  /**
   * Header is the name or a TemplateResult for custom HTML.
   */
  header: string = '';

  /**
   * CellMapper maps the RowType to the value to show in the table cell for
   * this row. Can also be a TemplateResult for custom HTML.
   * @returns string to show or custom HTML to show in the cell
   */
  cellRenderer: (row: RowType) => string = () => '';

  static of<T>(partial: Partial<StringHeader<T>>): StringHeader<T> {
    return Object.assign(new StringHeader(), partial);
  }
}
