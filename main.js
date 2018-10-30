
const App = {};

App.main = (data, filterFn) => {
    const facts = document.querySelector("#facts");
    const schema = document.querySelector("#schema");
    const result = document.querySelector("#result");
    const filter = document.querySelector("#filter");
    
    facts.value = JSON.stringify(data.facts);
    schema.value = JSON.stringify(data.schema);

    filter.addEventListener("click", () => {
        const newFacts = JSON.parse(facts.value);
        const newSchema = JSON.parse(schema.value);
        const newResult = filterFn(newFacts, newSchema);
        console.log(newResult);
        result.value = JSON.stringify(newResult);
    });
};

App.filterFn = (facts, schema) => {
    const trueFacts = facts.filter(f => f[3]);
    const oneToOneAttributes = schema.filter(s => s[2] === "one");
    const isOneToOne = (curr) => {
        return oneToOneAttributes.find(e => e[0] === curr[1]);
    };
    const isRecorded = (acc, curr) => {
        return acc.find(e => e[0] === curr[0] && e[1] === curr[1]);
    };
    const latest = trueFacts.reduceRight((acc, curr) => {
        if(!isOneToOne(curr) || !isRecorded(acc, curr))
            acc.push(curr);
        return acc;
    }, []);
    return latest.reverse();
};

App.data = {};

App.data.facts = [
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua alice, 10', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ['joão', 'telefone', '234-5678', true],
  ['joão', 'telefone', '91234-5555', true],
  ['joão', 'telefone', '234-5678', false],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true],
];

App.data.schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];

App.data.result = [
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ["joão", "telefone", "234-5678", true],
  ['joão', 'telefone', '91234-5555', true],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true]
];

App.main(App.data, App.filterFn);