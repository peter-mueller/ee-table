

# 👷WIP👷 \<ee-table>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i ee-table
```

## Usage

![image](https://user-images.githubusercontent.com/9094815/119236977-abd08980-bb3a-11eb-96a7-60825918161e.png)

```html

<!-- Element definition, you still need to set items property! -->
<mwc-table id="demo" fixed dense></mwc-table>

<script type="module">
  import { html, render } from 'lit-html';
  import '../dist/mwc-table.js';
  import { DataTable } from '../dist/index.js';

  class Person {
      name = "";

      surname = "";

      static of(object) {
          return Object.assign(new Person(), object);
      }
  }

  const table = new DataTable();

    const checkbox = html`<input @input=${() => alert("checked changed")} type="checkbox" style="height: 16px; width: 16px;">`
    table.addHeader(LitHeader.of({
      header: checkbox,
      cellRenderer: () => checkbox,
      columnStyles: () => ({
        borderLeft: "2px solid white",
      }),
      cellStyles: p => (p.name === "Hans" ? {
        borderLeft:  "2px solid red"
      } : {})
    }));

    table.addHeader(LitHeader.of({
      header: "Name",
      cellRenderer: p => html`<a href="./">${p.name}</a>`,
    }));

    table.addHeader(StringHeader.of({
      header: "Surname",
      cellRenderer: p => p.surname,
    }));

    table.addHeader(StringHeader.of({
      header: "Full Name",
      cellRenderer: p => [p.surname, p.name].filter(value => !!value).join(", "),
    }));

  table.items = [
      Person.of({name: "Hans", surname: "Test"}),
      Person.of({name: "Franzzzzzzzzzzzzzzzzzzzz", surname: "Mülllerrrrrrrrrrrrrrr"}),
      Person.of({name: "Anna"}),
  ]

  document.querySelector('#demo').table = table;
</script>

```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
