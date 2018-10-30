
const vigencia = (facts, schema) => {
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

const info = {};

info.facts = [
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua alice, 10', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ['joão', 'telefone', '234-5678', true],
  ['joão', 'telefone', '91234-5555', true],
  ['joão', 'telefone', '234-5678', false],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true],
];

info.schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];

info.result = [
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ['joão', 'telefone', '91234-5555', true],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true]
];

console.log(vigencia(info.facts, info.schema));