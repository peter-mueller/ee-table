import { css, html, LitElement, CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
import { StyleInfo, styleMap } from 'lit/directives/style-map.js';

import { DataTable } from './DataTable.js';

export class EeTable extends LitElement {
  static fixedStyle = css`
    :host([fixed]) table {
      table-layout: fixed;
    }

    :host([fixed]) th,
    :host([fixed]) td {
      max-width: 10ch;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  static styles: CSSResultArray = [
    css`
      :host {
        display: block;
      }
    `,
    EeTable.fixedStyle,
  ];

  @property({ type: Object })
  table: DataTable<unknown> = new DataTable();

  @property({ type: String })
  caption: string = '';

  @property({ type: Boolean, attribute: true })
  fixed: boolean = false;

  _header() {
    return html`
      <thead>
        <tr>
          ${this.table.headers.map(
            h => html`
              <th
                style=${styleMap(
                  EeTable._combinedStyles(undefined, [
                    h.columnStyles,
                    h.headerStyles,
                  ])
                )}
              >
                ${h.header}
              </th>
            `
          )}
        </tr>
      </thead>
    `;
  }

  _body() {
    return html`
      <tbody>
        ${this.table.items.map(item => this._row(item))}
      </tbody>
    `;
  }

  static _combinedStyles(
    item: unknown | undefined,
    s: (((i?: unknown) => StyleInfo) | undefined)[]
  ) {
    const st = s.filter(a => a !== undefined).map(b => (b ? b(item) : {}));
    return Object.assign({}, ...st);
  }

  _row(item: unknown) {
    return html`
      <tr>
        ${this.table.headers.map(
          h => html`
            <td
              style=${styleMap(
                EeTable._combinedStyles(item, [h.columnStyles, h.cellStyles])
              )}
            >
              ${h.cellRenderer(item)}
            </td>
          `
        )}
      </tr>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _footer() {
    return html`
      <tfoot>
        <!-- does not work??! -->
        <slot name="footer"></slot>
      </tfoot>
    `;
  }

  render() {
    return html`
      <table>
        <caption>
          ${this.caption}
        </caption>
        ${this._header()} ${this._footer()} ${this._body()}
      </table>
    `;
  }
}
