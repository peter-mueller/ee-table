
var template = document.createElement('template');
template.innerHTML = `
<style>

</style>
<table id="table">
  <thead id="thead">
    
  <thead>
  <tbody id="tbody">
  
  </tbody>
</table>
`;



class Person {
  name: string = "";
  age: number = 0;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Header<Type> {
  title: string = ""
  valueFunc: (value: Type) => string = () => "";

  constructor(title: string, valueFunc: (value: Type) => string) {
    this.title = title;
    this.valueFunc = valueFunc;
  }
}


class Table<Type> {
  headers: Header<Type>[] = [];
  rows: Type[] = [];
}

function th(header: Header<any>): HTMLTableCellElement {
  let th = document.createElement('th');
  th.innerText = header.title;
  return th;
}


function td<T>(header: Header<T>, row: T): HTMLTableCellElement {
  let td = document.createElement('td');
  td.innerText = header.valueFunc(row);
  return td;
}


function renderHeaders(thead: HTMLTableSectionElement, headers: Header<any>[]) {
  let tr = document.createElement('tr');
  for (let h of headers) {
    tr.appendChild(th(h));
  }
  thead.replaceChildren(tr);
}

function mustGetById(root: ShadowRoot, id: string): HTMLElement {
  let el = root.getElementById(id);
  if (el == null) {
    throw new Error(`element with id ${id} not found`)
  }
  return el;
}

function renderRows(tbody: HTMLTableSectionElement, headers: Header<any>[], rows: any[]) {
  tbody.replaceChildren();
  for (let r of rows) {
    let tr = document.createElement('tr');
    for (let h of headers) {
      tr.appendChild(td(h, r));
    }
    tbody.appendChild(tr);
  }
}

class MyNonReactiveTable extends HTMLElement {
  elementTable: HTMLTableElement;
  elementThead: HTMLTableSectionElement;
  elementTbody: HTMLTableSectionElement;

  _headers: Header<any>[] = [];
  _rows: any[] = [];

  constructor() {
    super();
    let root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));

    this.elementTable = mustGetById(root, 'table') as HTMLTableElement;
    this.elementThead = mustGetById(root, 'thead') as HTMLTableSectionElement;
    this.elementTbody = mustGetById(root, 'tbody') as HTMLTableSectionElement;
  }

  set table(t: Table<any>) {
    this.headers = t.headers;
    this.rows = t.rows;
  }

  set headers(headers: Header<any>[]) {
    this._headers = headers;
    renderHeaders(this.elementThead, headers);
    renderRows(this.elementTbody, headers, this._rows);
  }

  set rows(rows: any[]) {
    this._rows = rows;
    renderRows(this.elementTbody, this._headers, rows);
  }

}
customElements.define('my-non-reactive-table', MyNonReactiveTable);

let myapptemplate = document.createElement('template');
myapptemplate.innerHTML = `
  <my-non-reactive-table id="table"></my-non-reactive-table>
`;
class MyApp extends HTMLElement {
  elementTable: MyNonReactiveTable;

  constructor() {
    super();
    let root = this.attachShadow({ mode: 'open' });
    root.appendChild(myapptemplate.content.cloneNode(true));
    this.elementTable = mustGetById(root, 'table') as MyNonReactiveTable;
  }

  connectedCallback() {

    let table = new Table<Person>();
    table.headers = [
      new Header<Person>("Name", (p) => p.name),
      new Header<Person>("Age", (p) => p.age + ""),
    ];
    table.rows = [
      new Person("Franz", 21),
      new Person("Anna", 18),
      new Person("Hans", 32)
    ];
    customElements.upgrade(this.elementTable)
    this.elementTable.table = table;
  }
}

customElements.define('my-app', MyApp);
