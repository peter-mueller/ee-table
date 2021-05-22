

# 👷WIP👷 \<ee-table>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i ee-table
```

## Usage

![image](https://user-images.githubusercontent.com/9094815/119236268-bdb02d80-bb36-11eb-815a-c03bafd07eaa.png)

```html
<script type="module">
  import '../dist/mwc-table.js';
  import { DataTable, Header } from '../dist/index.js';

  // Person is the source object that will be displayed in the table
  class Person {
      name = "";
      surname = "";
      static of(object) {
          return Object.assign(new Person(), object);
      }
  }

  // DataTable is inspired by Rs dataframes
  const dt = new DataTable();

  // Column metadata Definition
  const checkbox = html`<input type="checkbox" style="height: 16px; width: 16px">`
  dt.addHeader(new Header(checkbox, () => checkbox));
  dt.addHeader(new Header("Name", p => html`<a href="./">${p.name}</a>`));
  dt.addHeader(new Header("Surname", p => p.surname));
  dt.addHeader(new Header("Full Name", p => [p.surname, p.name].filter(value => !!value).join(", ")));

  // Persons to show as rows
  dt.items = [
      Person.of({name: "Hans", surname: "Test"}),
      Person.of({name: "Franzzzzzzzzzzzzzzzzzzzz", surname: "Mülllerrrrrrrrrrrrrrr"}),
      Person.of({name: "Anna"}),
  ]
</script>

<ee-table></ee-table>
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
