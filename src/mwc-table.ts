import { css, property, CSSResult } from 'lit-element';

import { EeTable } from './ee-table.js';

export class MwcTable extends EeTable {
  @property({ type: Boolean, attribute: true })
  dense: boolean = false;

  static denseStyle = css`
    :host([dense]) thead tr {
      height: 40px;
    }

    :host([dense]) tbody tr {
      height: 36px;
    }
  `;

  /**
   * MDC Theme Summary:
   * --mdc-theme-primary	The theme primary color
   * --mdc-theme-secondary	The theme secondary color
   * --mdc-theme-background	The theme background color
   * --mdc-theme-surface	The theme surface color
   * --mdc-theme-on-primary	Text color on top of a primary background
   * --mdc-theme-on-secondary	Text color on top of a secondary background
   * --mdc-theme-on-surface Text color on top of a surface background
   */
  static styles: CSSResult[] = [
    ...EeTable.styles,
    css`
      table {
        border-collapse: collapse;
        border-radius: 4px;
        background-color: var(--mdc-theme-surface, white);
        color: var(--mdc-theme-on-surface, black);
        border: 1px solid var(--mdc-theme-secondary, lightgray);
      }

      thead tr {
        height: 56px;
      }

      th {
        text-align: left;
      }

      tr,
      th + tr {
        border-top: 1px solid var(--mdc-theme-secondary, lightgray);
      }

      td,
      th {
        padding: 0 16px;
        min-height: 40px;
        min-width: 40px;
      }

      tbody tr {
        height: 52px;
      }
    `,
    MwcTable.denseStyle,
  ];
}
