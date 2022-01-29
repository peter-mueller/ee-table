
var template = document.createElement('template');
template.innerHTML = `
<table id="table">
  <thead id="thead">
    
  <thead>
  <tbody id="tbody">
  
  </tbody>
</table>
`;



class refs {
  table: HTMLTableElement = null;
  thead: HTMLTableSectionElement = null;
  tbody: HTMLTableSectionElement = null;
}

function parseRefs(refs: object, shadowRoot: ShadowRoot | null) {
  if (shadowRoot == null) {
    throw new Error("no shadow rot");
  }
  for (let ref in refs) {
      let el = shadowRoot.getElementById(ref);
      if (el != null) {
        customElements.upgrade(el);
      }
      refs[ref] = el;
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

class MyNonReactiveTable extends HTMLElement {
  _refs = new refs();
  
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    parseRefs(this._refs, this.shadowRoot);
  }
  
  set table(t: Table<any>) {
    this.renderHeaders(t.headers);
    this.renderRows(t);
  }
  
  renderHeaders(headers: Header<any>[]) {
    let tr = document.createElement('tr');
    for (let h of headers) {
      let td = document.createElement('th');
      td.innerText = h.title;
      tr.appendChild(td);
    }
    this._refs.thead.replaceChildren(tr);
  }
  
  renderRows(t: Table<any>) {
    let tbody = this._refs.tbody
    
    tbody.replaceChildren();
    for (let r of t.rows) {
      let tr = document.createElement('tr');
      for (let h of t.headers) {
        let td = document.createElement('td');
        td.innerText = h.valueFunc(r);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  } 
  
}
customElements.define('my-non-reactive-table', MyNonReactiveTable);

let myapptemplate = document.createElement('template');
myapptemplate.innerHTML = `
  <my-non-reactive-table id="table"></my-non-reactive-table>
`;

class myapprefs {
  table: MyNonReactiveTable = null;
}

class Person {
  name: string = "";
  age: number = 0;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class MyApp extends HTMLElement {
  _refs = new myapprefs()
  
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(myapptemplate.content.cloneNode(true));
  }
  
  connectedCallback() {
    parseRefs(this._refs, this.shadowRoot);
    
    let table = new Table<Person>();
    table.headers = [
      new Header<Person>("Name", (p) => p.name ),
      new Header<Person>("Age", (p) => p.age+""),
    ];
    table.rows = [
      new Person("Franz", 21),
      new Person("Anna", 18),
      new Person("Hans", 32)
    ];
    this._refs.table.table = table;
  }
}

customElements.define('my-app', MyApp);
