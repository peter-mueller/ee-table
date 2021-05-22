/* eslint-disable max-classes-per-file */
import { TemplateResult } from 'lit-html';

/**
 * Header gives away metadata for a header and its column.
 *
 * This is the functional/modern?/alternative way for annotations (Java, Go Tags, ...).
 * As decorators are only a proposal currently.
 */
export class Header<RowType> {
  /**
   * Name of the header or a TemplateResult for custom HTML.
   */
  name: string | TemplateResult = '';

  /**
   * Valueer maps the RowType to the value to show in the table cell for
   * this row. Can also be a TemplateResult for custom HTML.
   * @returns string to show or custom HTML to show in the cell
   */
  valueer: (row: RowType) => string | TemplateResult = () => '';

  constructor(name: string, valueer: (row: RowType) => string) {
    this.name = name;
    this.valueer = valueer;
  }
}

export class DataTable<RowType> {
  /**
   * Headers summarize the metadata-information for all columns.
   *
   * e.g.:
   *   What to show on the header?
   *   What to show for a row in the cell that is under this header?
   */
  headers: Header<RowType>[] = [];

  /**
   * Items are the structured Information (RowType) for a row.
   *
   * The headers decide how the display a item in their column.
   */
  items: RowType[] = [];

  addHeader(header: Header<RowType>) {
    this.headers.push(header);
  }

  /**
   * printToConsole logs the datatable.
   *
   * This method is used how to parse the headers & items and turn them
   * into a display format.
   */
  printToConsole() {
    // eslint-disable-next-line no-console
    console.log(this.headers.map(h => h.name).join(' | '));
    // eslint-disable-next-line no-console
    console.log(this.headers.map(() => '-'.repeat(3)).join(' | '));
    this.items.forEach(item => {
      const row = this.headers.map(h => h.valueer(item)).join(' | ');
      // eslint-disable-next-line no-console
      console.log(row);
    });
  }
}
