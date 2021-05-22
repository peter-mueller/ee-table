import { html, css, LitElement, property, CSSResult } from 'lit-element';

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

  static styles: CSSResult[] = [
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
          ${this.table.headers.map(h => html`<th>${h.header}</th>`)}
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

  _row(item: unknown) {
    return html`
      <tr>
        ${this.table.headers.map(h => html`<td>${h.cellMapper(item)}</td>`)}
      </tr>
    `;
  }

  render() {
    return html`
      <table>
        <caption>
          ${this.caption}
        </caption>

        ${this._header()} ${this._body()}
      </table>
    `;
  }
}
