let tpl = './included/template.tpl';
// tpl = `@include(./included/template.tpl)`;

const path = resolve('./included/template.tpl');
const content = readFileSync(path, 'utf-8');
assert.equal(tpl, content.replace(/\r/g, '')); // normalize content as inside backticks newlines are always \n