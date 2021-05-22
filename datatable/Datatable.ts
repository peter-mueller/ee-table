
class Person {
    name: string = "";
    surname: string = "";

    static of(object: Partial<Person>): Person {
        return Object.assign(new Person(), object);
    }
}

class Header<RowType> {
    name: string = "";
    valueer: (row: RowType) => string = () => "";

    constructor(name: string, valueer: (row: RowType) => string) {
        this.name = name;
        this.valueer = valueer;
    }
}

class DataTable<RowType> {
    headers: Header<RowType>[] = [];
    items: RowType[] = [];
    
    addHeader(header: Header<RowType>) {
        this.headers.push(header);
    }

    print() {
        console.log(this.headers.map(h => h.name).join(" | "));
        console.log(this.headers.map(h => h.name.length).map(l => "-".repeat(l)).join(" | "));
        this.items.forEach(item => {
            const row = this.headers
                .map(h => {
                    let value = h.valueer(item)
                    if (value.length > h.name.length) {
                        value  = value.substr(0, h.name.length -1) + "…"
                    }
                    return value;
                })
                .join(" | ");
            console.log(row);
        })
    }
}

const dt = new DataTable<Person>();
dt.addHeader(new Header("name", p => p.name));
dt.addHeader(new Header("surname", p => p.surname));

dt.items = [
    Person.of({name: "Franz", surname: "Mayer"}),
    Person.of({name: "Franz", surname: "Mayer"}),
    Person.of({name: "Franz"}),
]

dt.print()
